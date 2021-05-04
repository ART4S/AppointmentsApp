import axios from "axios";
import ClientError from "common/errors/clientError";

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

export default new Client();
