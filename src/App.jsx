import React from "react";
import './App.css'
import { ForecastViewer } from './components/ForecastViewer'


function App() {
  return (
    <>
      <h1>Time Series Forecasting App</h1>
      <div style={{ padding: "20px" }}>
        <ForecastViewer />
      </div>
    </>
  );
}

export default App
