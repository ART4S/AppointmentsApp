export default class ClientError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}
