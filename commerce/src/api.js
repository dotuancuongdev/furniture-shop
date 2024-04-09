import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api/`,
  timeout: 30000,
});

export default api;
