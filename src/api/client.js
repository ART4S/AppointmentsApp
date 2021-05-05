/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable dot-notation */
/* eslint-disable no-param-reassign */
import axios from "axios";

import Cookies from "js-cookie";

import ClientError from "common/errors/clientError";

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
});

let token = Cookies.get("token");

function useToken(headers = {}) {
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

class Client {
  setToken(newToken) {
    token = newToken;
    Cookies.set("token", newToken);
  }

  get(url, params) {
    return this.handleError(() =>
      httpClient.get(url, { params, headers: useToken() }),
    );
  }

  post(url, body, headers = {}) {
    useToken(headers);
    return this.handleError(() => httpClient.post(url, body, { headers }));
  }

  put(url, body, headers = {}) {
    useToken(headers);
    return this.handleError(() => httpClient.put(url, body, { headers }));
  }

  async handleError(promiseGetter) {
    try {
      return await promiseGetter();
    } catch (e) {
      throw new ClientError(e.message);
    }
  }
}

export default new Client();
