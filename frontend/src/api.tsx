import axios from "axios";

// Retrieve the base URL from environment variables
const baseURL = import.meta.env.VITE_API_BASE_URL; 

const api = axios.create({
  baseURL,
  withCredentials: true, // This ensures cookies and headers are sent across origins
});

// Interceptor to include Authorization token (if any)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
