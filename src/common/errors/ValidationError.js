export default class ValidationError extends Error {
  constructor(error) {
    super();
    this.error = error;
  }
}
