import axios, { AxiosError } from "axios";
import config from "../config";

const http = axios.create({
  baseURL: config.apiUrl,
});

http.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error: AxiosError) => {
    throw error;
  },
);

export default http;