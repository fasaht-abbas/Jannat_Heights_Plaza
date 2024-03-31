import axios, { AxiosError, isAxiosError } from "axios";
import { env } from "./validate";
import { store } from "../redux/store";
import { jwtDecode } from "jwt-decode";
import { refreshing } from "./refreshTokens";

import toast from "react-hot-toast";
export const api = axios.create({
  baseURL: env.REACT_APP_API_BASE_URL,
});

// THe protected api will send the authorization header along with it

export const protectedApi = axios.create({
  baseURL: env.REACT_APP_API_BASE_URL,
  withCredentials: true,
  headers: { Authorization: store.getState().auth.token },
});

// the two step protection for the expire token is as following

protectedApi.interceptors.request.use(
  async (config) => {
    const token = store.getState().auth?.token;
    const decoded = jwtDecode(token);
    const expiry = decoded?.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    if (expiry && expiry - currentTime <= 20) {
      await refreshing().then(() => {
        const newToken = store?.getState().auth.token;
        config.headers["authorization"] = "Bearer " + newToken;
      });
    } else if (config.headers.authorization === undefined || null) {
      config.headers["authorization"] = "Bearer " + store.getState().auth.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

protectedApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response ? error.response.status : null;
    if (status === 401 || status === 403) {
      await refreshing()
        .then(() => {
          const newToken = store?.getState().auth.token;
          error.config.headers["authorization"] = "Bearer " + newToken;
          error.config.baseURL = "";
          return protectedApi.request(error.config);
        })
        .catch((err) => err);
    }
    return Promise.reject(error);
  }
);

export const handleError = (error: any) => {
  if (isAxiosError(error)) {
    if (error?.response?.status === 401) {
      console.log(error);
      return;
    } else {
      toast.error(
        error.response?.data?.errorMessage ||
          "something went wrong...try again later"
      );
    }
  } else {
    toast.error("something went wrong");
  }
};
