import axios, { AxiosResponse, AxiosError } from "axios";

const API = axios.create({
  baseURL: "https://api-todo-list-pbw.vercel.app",
});

API.interceptors.request.use(
  (config: any): any => {
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (reponse: AxiosResponse): AxiosResponse => {
    return reponse;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

export default API;
