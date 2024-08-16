import axios, { isAxiosError } from "axios";
import { env } from "./validate";
import { store } from "../redux/store";
import { jwtDecode } from "jwt-decode";
import { refreshing } from "./refreshTokens";

import toast from "react-hot-toast";
import { showModal } from "../redux/Session.Expire";
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
      const success = await refreshing();
      if (success) {
        const newToken = store?.getState().auth.token;
        config.headers["authorization"] = "Bearer " + newToken;
      } else {
        store.dispatch(showModal());
      }
    } else if (!config.headers.authorization) {
      config.headers["authorization"] = "Bearer " + store.getState().auth.token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

protectedApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response ? error.response.status : null;
    if (status === 401 || status === 403) {
      const success = await refreshing();
      if (success) {
        const newToken = store?.getState().auth.token;
        error.config.headers["authorization"] = "Bearer " + newToken;
        error.config.baseURL = "";
        return protectedApi.request(error.config);
      } else {
        store.dispatch(showModal());
      }
    }
    return Promise.reject(error);
  }
);

export const handleError = (error: any) => {
  if (isAxiosError(error)) {
    if (error?.response?.status === 401) {
      return;
    } else {
      toast.error(
        (error.response?.data?.errorMessage as string) ||
          "something went wrong..."
      );
    }
  } else {
    toast.error(error?.message);
  }
};
