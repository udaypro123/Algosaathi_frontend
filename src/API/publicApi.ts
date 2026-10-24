import axios from "axios";

const publicApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "/api",
    timeout: 10000,
});

publicApi.interceptors.response.use(
    (response) => response,

    (error) => {
        console.error("Public API request failed", error.response?.status ?? "Network error");

        return Promise.reject(error);
    }
);

export default publicApi;