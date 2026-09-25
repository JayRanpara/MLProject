import joblib
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, roc_auc_score

print("Loading dataset...")
df = pd.read_csv("cardio_train.csv", sep=";")
df.drop("id", axis=1, inplace=True)
df['age'] = df['age'] // 365
df['gender'] = df['gender'].map({1: 0, 2: 1})
df["cholesterol"] = df["cholesterol"].map({1: 0, 2: 1, 3: 2})
df["gluc"] = df["gluc"].map({1: 0, 2: 1, 3: 2})
df = pd.get_dummies(df, columns=["alco", "active"], drop_first=True)

# Outliers
df = df[df['height'] < 250]
df = df[(df['weight'] > 30) & (df['weight'] < 200)]
df = df[(df['ap_hi'] >= 70) & (df['ap_hi'] <= 250)]
df = df[(df['ap_lo'] >= 40) & (df['ap_lo'] <= 150)]

num_cols = ["age", "height", "weight", "ap_hi", "ap_lo"]
scaler = StandardScaler()
df[num_cols] = scaler.fit_transform(df[num_cols])

X = df.drop(columns='cardio')
Y = df['cardio']

print(f"Total dataset: {len(df)} samples")
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

print("Training Logistic Regression...")
lr_model = LogisticRegression(max_iter=1000, random_state=42)
lr_model.fit(X_train, Y_train)
lr_acc = accuracy_score(Y_test, lr_model.predict(X_test))
print(f"Logistic Regression Accuracy: {lr_acc:.4f}")

print("Training Random Forest Classifier (100 estimators, max_depth=12)...")
rf_model = RandomForestClassifier(n_estimators=100, max_depth=12, random_state=42, n_jobs=-1)
rf_model.fit(X_train, Y_train)
rf_acc = accuracy_score(Y_test, rf_model.predict(X_test))
print(f"Random Forest Accuracy: {rf_acc:.4f}")

# Multi-model bundle
model_bundle = {
    "model": rf_model, # default production model now Random Forest
    "rf_model": rf_model,
    "lr_model": lr_model,
    "scaler": scaler,
    "feature_names": X.columns.tolist(),
    "metrics": {
        "random_forest": {"accuracy": rf_acc},
        "logistic_regression": {"accuracy": lr_acc}
    }
}

joblib.dump(model_bundle, "cardio_model.pkl")
joblib.dump(rf_model, "rf_model.pkl")
print("Saved cardio_model.pkl (bundled with both models) and rf_model.pkl successfully!")
