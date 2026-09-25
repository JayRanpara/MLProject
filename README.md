# CardioSight

A React frontend for the `cardio_model.pkl` cardiovascular-risk model, with a small FastAPI service that keeps the model on the server.

## Run it

Use two terminals from `D:\mLProject`.

```powershell
# Terminal 1: model API
python -m pip install -r server/requirements.txt
python -m uvicorn server.app:app --reload --port 8000
```

```powershell
# Terminal 2: React frontend
npm install
npm run dev
```

Open the local address printed by Vite (normally `http://localhost:5173`). The frontend sends the form data to the API, which loads `cardio_model.pkl`, applies the saved scaler, and returns the model's actual probability.

To point the React app at a deployed API, create a `.env` file in the project root:

```text
VITE_API_URL=https://your-api.example.com
```
