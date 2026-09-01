import axios from "axios";

const publicApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
});

publicApi.interceptors.response.use(
    (response) => response,

    (error) => {
        console.error("Public API Error:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            url: error.config?.url,
        });

        return Promise.reject(error);
    }
);

export default publicApi;