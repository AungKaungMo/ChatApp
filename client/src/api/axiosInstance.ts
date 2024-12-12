import axios from "axios";

const baseURL = import.meta.env.VITE_APP_BASE_URL;
const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
