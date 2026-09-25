import sqlite3
from pathlib import Path
from datetime import datetime, timedelta
import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, EmailStr
from passlib.context import CryptContext
import jwt

PROJECT_ROOT = Path(__file__).resolve().parent.parent
MODEL_PATH = PROJECT_ROOT / "cardio_model.pkl"
DB_PATH = PROJECT_ROOT / "server" / "cardio.db"

# JWT Config
SECRET_KEY = "cardiosight_secret_super_key_for_jwt"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7 # 7 days

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()

init_db()

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()

if not MODEL_PATH.exists():
    raise RuntimeError(f"Model file was not found: {MODEL_PATH}")

model_bundle = joblib.load(MODEL_PATH)
model = model_bundle["model"]
scaler = model_bundle["scaler"]
feature_names = model_bundle["feature_names"]
numeric_columns = ["age", "height", "weight", "ap_hi", "ap_lo"]

app = FastAPI(title="CardioSight API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user_name: str

class HealthProfile(BaseModel):
    age: int = Field(ge=18, le=100)
    gender: int = Field(ge=0, le=1)
    height: float = Field(ge=100, le=250)
    weight: float = Field(ge=30, le=200)
    ap_hi: int = Field(ge=70, le=250)
    ap_lo: int = Field(ge=40, le=150)
    cholesterol: int = Field(ge=0, le=2)
    gluc: int = Field(ge=0, le=2)
    smoke: int = Field(ge=0, le=1)
    alco_1: int = Field(ge=0, le=1)
    active_1: int = Field(ge=0, le=1)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@app.post("/api/auth/register", response_model=Token)
def register(user: UserCreate, db: sqlite3.Connection = Depends(get_db)):
    cursor = db.cursor()
    cursor.execute("SELECT id FROM users WHERE email = ?", (user.email,))
    if cursor.fetchone():
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_pwd = get_password_hash(user.password)
    cursor.execute(
        "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
        (user.name, user.email, hashed_pwd)
    )
    db.commit()
    
    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer", "user_name": user.name}

@app.post("/api/auth/login", response_model=Token)
def login(user: UserLogin, db: sqlite3.Connection = Depends(get_db)):
    cursor = db.cursor()
    cursor.execute("SELECT name, password_hash FROM users WHERE email = ?", (user.email,))
    row = cursor.fetchone()
    if not row or not verify_password(user.password, row["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    
    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer", "user_name": row["name"]}

@app.get("/health")
def health_check():
    return {"status": "ready"}

@app.post("/predict")
def predict(profile: HealthProfile):
    values = profile.model_dump()
    features = pd.DataFrame([[values[column] for column in feature_names]], columns=feature_names)
    features[numeric_columns] = scaler.transform(features[numeric_columns])

    probability = float(model.predict_proba(features)[0][1])
    prediction = int(probability >= 0.5)
    return {"prediction": prediction, "risk_probability": probability}
