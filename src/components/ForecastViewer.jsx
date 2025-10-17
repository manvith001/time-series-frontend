import React, { useState } from "react";
import { foreCastService } from "../service/apiService";
import TrainModel from "./TrainModel";
import ForecastChart from "./ForecastChart";

export const ForecastViewer = () => {
  const [periods, setPeriods] = useState(24);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modelDetails, setModelDetails] = useState(null);
  const [inputError, setInputError] = useState(""); 

  const handleModelTrained = (data) => {
    setModelDetails(data);
  };

  const handlePeriodChange = (e) => {
    const value = e.target.value;

    
    if (value === "" || isNaN(value)) {
      setInputError("Please enter a valid number");
      setPeriods("");
    } else if (value <= 0) {
      setInputError("Number of periods must be greater than 0");
      setPeriods(value);
    } else if (value > 1000) {
      setInputError("Maximum allowed is 1000 periods");
      setPeriods(value);
    } else {
      setInputError("");
      setPeriods(value);
    }
  };

  const getForecast = async () => {
    if (!modelDetails) return setError("Please train a model first.");
    if (inputError || !periods) return setError("Please enter a valid number of periods.");

    setError("");
    setLoading(true);

    try {
      const res = await foreCastService(
        modelDetails.model_name,
        modelDetails.version,
        modelDetails.file_name,
        Number(periods)
      );

      if (res.success) {
        setForecastData(res.data);
      } else {
        setError(res.message);
      }
    } catch {
      setError(" Error fetching forecast");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <TrainModel onModelTrained={handleModelTrained} />
      <br />

      {modelDetails && (
        <div style={{ marginBottom: "20px" }}>
          <h4>Trained Model Details</h4>
          <p><strong>Model:</strong> {modelDetails.model_name}</p>
          <p><strong>Version:</strong> {modelDetails.version}</p>
          <p><strong>File:</strong> {modelDetails.file_name}</p>
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        <h3>Forecast</h3>
        <input
          type="number"
          min="1"
          max="1000"
          value={periods}
          onChange={handlePeriodChange}
          placeholder="Enter number of periods"
          style={{
            marginRight: "12px",
            padding: "6px",
            borderColor: inputError ? "red" : "#ccc",
          }}
        />
        <button onClick={getForecast} disabled={loading}>
          {loading ? "Fetching..." : "Get Forecast"}
        </button>

        
        {inputError && <p style={{ color: "red", marginTop: "6px" }}>{inputError}</p>}
      </div>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      {forecastData?.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <ForecastChart data={forecastData} />
        </div>
      )}
    </div>
  );
};
