export default class ServerError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}
