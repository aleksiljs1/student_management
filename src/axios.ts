import { urlConst } from "@/consts/path-consts";
import axios from "axios";
import { toast } from "react-toastify";

export const axiosInstance = axios.create({
  baseURL: urlConst.baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("we are in interceptors");
    const token = localStorage.getItem("token");
    if (token) {
      config.headers[`Authorization`] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data?.message) {
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
    return response;
  },

  (error) => {
    console.error(`api call failed:`, error);

    const message =
      error.response?.data?.message || error.message || "Something went wrong";

    if (error.response?.status === 401) {
      console.log("Unauthorized - Redirecting to login");
      window.location.href = "/login";
    } else {
      toast.error(message, {
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
  }
);
