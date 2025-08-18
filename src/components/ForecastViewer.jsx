import React, { useState, useEffect } from "react";
import { foreCastService } from "../service/apiService";
import TrainModel from "./TrainModel";
import ForecastChart from "./ForecastChart";

export const ForecastViewer = () => {
  const [periods, setPeriods] = useState(24);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 

  
  const validateInput = (value) => {
    if (!value || isNaN(value)) {
      return "Please enter a valid number";
    }
    if (value <= 0) {
      return "Number of periods must be greater than 0";
    }
    if (value > 1000) {
      return "Number of periods cannot exceed 1000"; 
    }
    return "";
  };

  const getForecast = async () => {
    const validationError = validateInput(Number(periods));
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await foreCastService(Number(periods));
      if (response.success) {
        setForecastData(response.data);
      } else {
        setError(response.message || "Error fetching forecast data");
      }
    } catch (error) {
      setError("Unexpected error fetching forecast data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getForecast();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <TrainModel />
      <br />
      <br />

      <div style={{ marginBottom: "16px" }}>
        <input
          type="number"
          placeholder="Enter number of periods"
          value={periods}
          onChange={(e) => setPeriods(e.target.value)}
          min="1"
          style={{ marginRight: "12px", padding: "6px 10px" }}
        />
        <button
          onClick={getForecast}
          disabled={loading}
          style={{ padding: "6px 16px" }}
        >
          {loading ? "Fetching..." : "Get Forecast"}
        </button>
      </div>

      
      {error && <p style={{ color: "red" }}>{error}</p>}

      {forecastData && forecastData.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <ForecastChart data={forecastData} />
        </div>
      )}
    </div>
  );
};
