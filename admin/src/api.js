import axios from "axios";
import { TOKEN } from "./constants";
import { handleLogOut } from "./helper";

const api = axios.create({
  baseURL: "http://127.0.0.1:8888/api/",
  timeout: 30000,
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem(TOKEN);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      handleLogOut();
    }

    return Promise.reject(error);
  }
);
export default api;
