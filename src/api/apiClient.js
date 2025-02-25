import axios from "axios";
import store from "../redux/store";

const apiClient = axios.create({
  baseURL: "https://mushy-marisa-dgnppr-a63d5cc2.koyeb.app/api/v1",
  // baseURL: process.env.REACT_APP_GLITCH_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.user?.token;

  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default apiClient;
