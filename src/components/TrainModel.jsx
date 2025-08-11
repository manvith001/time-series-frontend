import React, { useState } from "react";
import { trainModelService } from "../service/apiService";

const TrainModel = () => {
    const [training, setTraining] = useState(false);
    const [message, setMessage] = useState("");

    const handleTrainModel = async () => {
        setTraining(true);
        setMessage("");
        try {
            await trainModelService();
            setMessage("Model trained successfully.");
        } catch (error) {
            setMessage("Error training model.");
        } finally {
            setTraining(false);
        }
    };

    return (
        <div>
            <button onClick={handleTrainModel} disabled={training}>
                {training ? "Training..." : "Train Model"}
            </button>
            {message && <div style={{ marginTop: "10px" }}>{message}</div>}
        </div>
    );
};

export default TrainModel;
