import axios from 'axios';

// const apiUrl =import.meta.env.BACKEND_URL

const apiUrl = import.meta.env.VITE_API_URL
console.log("urll", import.meta.env.VITE_API_URL)


const handleError = (err, action) => {
    if (err.response) {
        return {
            success: false,
            message: err.response.data?.message || `Failed to ${action}`,
            status: err.response.status,
        };
    }
    else if (err.request) {
        return {
            success: false,
            message: `No response received while trying to ${action}`,
        };
    } else {
       
        return {
            success: false,
            message: `Error while trying to ${action}: ${err.message}`,
        };
    }
};





// end point to  Upload CSV
export const uploadCSVService = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const res = await axios.post(`${apiUrl}/upload_csv`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true, data: res.data };
  } catch (err) {
    return handleError(err, "upload CSV");
  }
};

// end point to Train Model
export const trainModelService = async (modelName, fileName) => {
  try {
    const response = await axios.post(
      `${apiUrl}/train?model_name=${modelName}&file_name=${fileName}`
    );
    return { success: true, data: response.data };
  } catch (err) {
    return handleError(err, "train the model");
  }
};


// end point to Predict
export const foreCastService = async (modelName, version, fileName, periods) => {
  try {
    const res = await axios.post(
      `${apiUrl}/predict?model_name=${modelName}&version=${version}&file_name=${fileName}&periods=${periods}`
    );
    return { success: true, data: res.data.Data };
  } catch (err) {
    return handleError(err, "get forecast");
  }
};