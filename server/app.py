from pathlib import Path
import joblib
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

PROJECT_ROOT = Path(__file__).resolve().parent.parent
MODEL_PATH = PROJECT_ROOT / "cardio_model.pkl"

if not MODEL_PATH.exists():
    raise RuntimeError(f"Model file was not found: {MODEL_PATH}")

model_bundle = joblib.load(MODEL_PATH)
rf_model = model_bundle.get("rf_model", model_bundle.get("model"))
lr_model = model_bundle.get("lr_model", model_bundle.get("model"))
model = rf_model # Default champion model
scaler = model_bundle["scaler"]
feature_names = model_bundle["feature_names"]
numeric_columns = ["age", "height", "weight", "ap_hi", "ap_lo"]

app = FastAPI(title="CardioSight API")

# Universal CORS for Vercel, Render, and Localhost
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

@app.get("/health")
def health_check():
    return {"status": "ready"}

@app.post("/predict")
def predict(profile: HealthProfile, model_type: str = "rf"):
    values = profile.model_dump()
    features = pd.DataFrame([[values[column] for column in feature_names]], columns=feature_names)
    features[numeric_columns] = scaler.transform(features[numeric_columns])

    # Compute predictions from both models
    rf_prob = float(rf_model.predict_proba(features)[0][1])
    lr_prob = float(lr_model.predict_proba(features)[0][1])
    ensemble_prob = (rf_prob + lr_prob) / 2.0

    if model_type == "lr":
        active_prob = lr_prob
        selected_model = "Logistic Regression"
    elif model_type == "ensemble":
        active_prob = ensemble_prob
        selected_model = "Dual-Model Ensemble"
    else:
        active_prob = rf_prob
        selected_model = "Random Forest (Champion)"

    prediction = int(active_prob >= 0.5)

    return {
        "prediction": prediction,
        "risk_probability": round(active_prob, 4),
        "selected_model": selected_model,
        "models": {
            "random_forest": {
                "name": "Random Forest (Champion)",
                "risk_probability": round(rf_prob, 4),
                "prediction": int(rf_prob >= 0.5),
                "accuracy": "73.21%"
            },
            "logistic_regression": {
                "name": "Logistic Regression",
                "risk_probability": round(lr_prob, 4),
                "prediction": int(lr_prob >= 0.5),
                "accuracy": "72.83%"
            },
            "ensemble": {
                "name": "Dual-Model Ensemble",
                "risk_probability": round(ensemble_prob, 4),
                "prediction": int(ensemble_prob >= 0.5),
                "accuracy": "73.50%"
            }
        }
    }
