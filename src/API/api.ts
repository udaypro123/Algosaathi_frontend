import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


// File uploaded: {
//   fieldname: 'file',
//   originalname: 'WhatsApp Image 2026-07-13 at 18.09.12.jpeg',
//   encoding: '7bit',
//   mimetype: 'image/jpeg',
//   path: 'C:\\Users\\Uday\\AppData\\Local\\Temp\\uploads\\file-1786439546778-629934114.jpeg',
//   destination: 'C:\\Users\\Uday\\AppData\\Local\\Temp\\uploads',
//   filename: 'file-1786439546778-629934114.jpeg',
//   size: 61102
// }

api.interceptors.response.use(
    (response) => response,

    (error) => {
        console.error("Axios Error:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
        });

        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default api;