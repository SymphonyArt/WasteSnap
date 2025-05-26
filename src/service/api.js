import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Sesuaikan dengan URL backend Anda
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk menambahkan token ke header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk menangani error response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token tidak valid atau expired
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;