import axios from 'axios';

// const apiUrl =import.meta.env.BACKEND_URLX
console.log("urll", import.meta.env.VITE_API_URL)
const apiUrl = import.meta.env.VITE_API_URL



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

export const trainModelService = async () => {

    try {
        const response = await axios.post(`${apiUrl}/train`);
        return response.data;
    } catch (err) {
       return handleError(err, "train the model");
    }
}


export const foreCastService = async (periods) => {
    try {
        const res = await axios.post(`${apiUrl}/predict?periods=${periods}`);
        return { success: true, data: res.data.Data };
    } catch (err) {
        return handleError(err, "get forecast");
    }
}



