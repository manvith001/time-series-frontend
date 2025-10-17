import React, { useState } from "react";
import { uploadCSVService, trainModelService } from "../service/apiService";

const TrainModel = ({ onModelTrained }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [modelName, setModelName] = useState("xgboost");
  const [message, setMessage] = useState("");
  const [training, setTraining] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

 
  const handleFileUpload = async () => {
    if (!file) return setMessage("⚠️ Please select a CSV file first.");
    setUploading(true);
    setMessage("Uploading file...");
    try {
      const res = await uploadCSVService(file);
      if (res.success) {
        setFileName(res.data.file_name);
        setMessage(res.data.message);
        setIsFileUploaded(true); 
      } else {
        setMessage(res.message);
        setIsFileUploaded(false);
      }
    } catch {
      setMessage("Error uploading file");
      setIsFileUploaded(false);
    } finally {
      setUploading(false);
    }
  };

 
  const handleTrainModel = async () => {
    if (!fileName) return setMessage(" Please upload a file first.");
    setTraining(true);
    setMessage("Training model...");
    try {
      const res = await trainModelService(modelName, fileName);
      if (res.success) {
        const { message, model_name, version, file_name, metrics } = res.data;
        setMessage(message);
        onModelTrained({ model_name, version, file_name, metrics });
      } else {
        setMessage(res.message);
      }
    } catch {
      setMessage(" Error training model");
    } finally {
      setTraining(false);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #faf5f5ff",
        borderRadius: "12px",
        padding: "20px",
        maxWidth: "450px",
      }}
    >
      <h3>Train Model</h3>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ marginRight: "12px" }}
      />
      <button onClick={handleFileUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload CSV"}
      </button>

      <br /><br />

    
      <label>
        Choose Model:
        <select
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          disabled={!isFileUploaded} 
          style={{
            marginLeft: "10px",
            backgroundColor: isFileUploaded ? "Black" : "#302B2B",
            cursor: isFileUploaded ? "pointer" : "not-allowed",
          }}
        >
          <option value="prophet">Prophet</option>
          <option value="xgboost">XGBoost</option>
          <option value="catboost">CatBoost</option>
        </select>
      </label>

      {!isFileUploaded && (
        <p style={{ fontSize: "0.9em", color: "gray" }}>
           Please upload a CSV first to enable model selection.
        </p>
      )}

      <br /><br />

      
      <button onClick={handleTrainModel} disabled={training || !isFileUploaded}>
        {training ? "Training..." : "Train Model"}
      </button>

      
      {message && (
        <div style={{ marginTop: "10px", color: "red" }}>
          <strong>{message}</strong>
        </div>
      )}
    </div>
  );
};

export default TrainModel;
