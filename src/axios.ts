import { urlConst } from "@/consts/path-consts";
import axios from "axios";
import { toast } from "react-toastify";

export const axiosInstance = axios.create({
  baseURL: urlConst.baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers[`Authorization`] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);
axiosInstance.interceptors.response.use(
  (responce) => responce,
  (error) => {
    console.error(`api call failed: ${error}`);
    if (error.response.status === 401) {
      console.log("Unauthorized - Redirecting to login");
      window.location.href = "/login";
    } else {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    return Promise.reject(error);
  },
);
