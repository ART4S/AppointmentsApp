/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";

import tokenExpiredEvent from "common/events/tokenExpiredEvent";

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      tokenExpiredEvent.publish();
    }
    return Promise.reject(error);
  },
);

class Client {
  get(url, params) {
    return httpClient.get(url, { params });
  }

  post(url, body, headers = {}) {
    return httpClient.post(url, body, { headers });
  }

  put(url, body, headers = {}) {
    return httpClient.put(url, body, { headers });
  }

  delete(url, body = {}, headers = {}) {
    return httpClient.delete(url, { data: body, headers });
  }
}

export default new Client();
