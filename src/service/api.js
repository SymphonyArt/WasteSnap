import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk menangani error
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject({
        message: error.response.data.message || "Terjadi kesalahan",
        status: error.response.status,
      });
    }
    return Promise.reject(error);
  }
);

export default api;
