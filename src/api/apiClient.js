import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_GLITCH_URL || "https://four-lettwes.glitch.me",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 (필요 시 추가)
apiClient.interceptors.request.use(
  config => config,
  error => Promise.reject(error),
);

// 응답 인터셉터 (필요 시 추가)
apiClient.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
);

export default apiClient;
