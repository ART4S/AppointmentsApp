import axios from "axios";

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
});

class Client {
  async get(url, params) {
    try {
      return await httpClient.get(url, { params });
    } catch (e) {
      throw new ClientError(e.message);
    }
  }
}

class ClientError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

export default new Client();
