import json
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, roc_auc_score, precision_score, recall_score, f1_score
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier

print("Loading data...")
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

print(f"Total dataset records after cleaning: {len(df)}")
# Use fixed random state for reproducible benchmark
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=42)
print(f"Train records: {len(X_train)}, Test records: {len(X_test)}")

models = {
    "Gradient Boosting": GradientBoostingClassifier(n_estimators=100, random_state=42),
    "Random Forest": RandomForestClassifier(n_estimators=100, max_depth=12, random_state=42, n_jobs=-1),
    "Logistic Regression": LogisticRegression(max_iter=1000, random_state=42),
    "Gaussian Naive Bayes": GaussianNB(),
    "K-Nearest Neighbors": KNeighborsClassifier(n_neighbors=25, n_jobs=-1),
    "Decision Tree": DecisionTreeClassifier(max_depth=10, random_state=42)
}

results = []

for name, clf in models.items():
    print(f"Training {name}...")
    clf.fit(X_train, Y_train)
    y_pred = clf.predict(X_test)
    if hasattr(clf, "predict_proba"):
        y_prob = clf.predict_proba(X_test)[:, 1]
    else:
        y_prob = clf.decision_function(X_test)
        
    acc = accuracy_score(Y_test, y_pred)
    roc = roc_auc_score(Y_test, y_prob)
    prec = precision_score(Y_test, y_pred, zero_division=0)
    rec = recall_score(Y_test, y_pred, zero_division=0)
    f1 = f1_score(Y_test, y_pred, zero_division=0)
    
    results.append({
        "name": name,
        "accuracy": acc,
        "roc_auc": roc,
        "precision": prec,
        "recall": rec,
        "f1": f1
    })

# Sort by accuracy descending
results = sorted(results, key=lambda x: x["accuracy"], reverse=True)

print("--- FINAL BENCHMARK RESULTS ---")
print(json.dumps(results, indent=2))
with open("benchmark_results.json", "w") as f:
    json.dump(results, f, indent=2)
