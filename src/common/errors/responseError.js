export default class ResponseError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}
