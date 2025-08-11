import axios from 'axios';

// const apiUrl =import.meta.env.BACKEND_URLX
console.log("ur;llllllllllllllllllllllllllll",import.meta.env.VITE_API_URL)
const apiUrl =import.meta.env.VITE_API_URL

export const trainModelService = async () => {

    try {
        const response = await axios.post(`${apiUrl}/train`);
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Error training model");
    }
}


export const foreCastService = async (periods) => {
    try {
        const res = await axios.post(`${apiUrl}/predict?periods=${periods}`);
        return { success: true, data: res.data.Data };
    } catch (err) {
        return handleError(err);
    }
}



