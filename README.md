#  Time Series Forecasting Frontend (React + Vite)

Frontend for the **Time Series Forecasting WebApp**.  
Built with **React + Vite**, styled using **TailwindCSS**, and integrated with a **FastAPI backend** for model training, predictions, and visualization.

---

## 📌 Features
- Interactive UI to trigger **model training**
- Request forecasts for **next N hours/days**
- Display results on an **interactive time series chart**
- Fetch and display **model performance metrics (MAE, RMSE)**
- Works with **local**, **Docker**, or **AWS-hosted** backend

---

## 🛠 Tech Stack
- **Framework:** React (Vite)
- **Styling:** TailwindCSS
- **Charts:** Chart.js / react-chartjs-2
- **API Communication:** Axios

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
Frontend will run at: http://localhost:5173

