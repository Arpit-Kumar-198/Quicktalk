import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development"
    ? "http://localhost:10000/api" // your local backend port
    : "https://quicktalk-backend-lvjv.onrender.com/api", // Render backend URL
  withCredentials: true,
});
