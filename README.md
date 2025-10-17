# 📈Time Series Forecasting Frontend (React + Vite)

Frontend for the **Time Series Forecasting WebApp**.  
Built with **React + Vite**, styled using **TailwindCSS**, and integrated with a **FastAPI backend** for model training, predictions, and interactive visualization.

---

## 🚀Features
- Interactive UI to **upload CSV datasets**
- Trigger **model training** for Prophet, XGBoost, or CatBoost
- Request forecasts for **next N hours/days**
- Display results on **interactive time series charts**
- Fetch and display **model performance metrics (MAE, RMSE, R²)**
- Responsive layout using **TailwindCSS**
- Works with **local**, **Docker**, or **AWS-hosted** backend

---

## Tech Stack
- **Framework:** React (Vite)
- **Styling:** TailwindCSS
- **Charts:** Chart.js / react-chartjs-2
- **HTTP Client:** Axios
- **State Management:** React hooks

---


## Project Structure
```
src/
  ├── components/     # Reusable UI components
  ├── pages/          # Main pages
  ├── services/       # API call utilities
  ├── App.jsx         # Root component
  └── main.jsx        # App entry point
```

## 🚀 How to Run

### **1. Clone Repo**
```bash
git clone https://github.com/manvith001/time-series-frontend.git
cd time-series-frontend
```
### **2. Install Dependencies**
bash
Copy
Edit
npm install

### **3. Set Environment Variables**
Create a .env file in the project root:
VITE_API_BASE_URL= backend_url

### **4. Start Development Server**
bash
Copy
Edit
npm run dev
Frontend will run at: http://localhost:8000

## Usage Flow

-Upload CSV – Upload your hourly dataset via the UI

-Train Model – Select Prophet, XGBoost, or CatBoost to train

-View Metrics – Check MAE, RMSE, and R² on the dashboard

-Predict – Forecast the next N hours/days

-Visualize – Interactive chart displays historical and forecasted values

##Notes

Ensure the backend is running and reachable at VITE_API_BASE_URL

File uploads and predictions are handled asynchronously

Metrics are fetched automatically after training

