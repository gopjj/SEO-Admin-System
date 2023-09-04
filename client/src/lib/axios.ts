import Axios, { InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL } from "../config";
import qs from "qs";

function requestInterceptor(config: InternalAxiosRequestConfig) {
  config.paramsSerializer = function (params) {
    return qs.stringify(params, { arrayFormat: "repeat" });
  };

  const token = "TestFooDigital";
  if (token) {
    config.headers.Authorization = `${token}`;
  }

  config.headers.Accept = "application/json";
  return config;
}

export const axios = Axios.create({
  baseURL: API_BASE_URL,
});

axios.interceptors.request.use(requestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.error(message);

    return Promise.reject(error);
  }
);
