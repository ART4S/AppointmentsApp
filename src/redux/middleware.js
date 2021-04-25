export const thunkMiddleware = (storeApi) => (next) => (action) => {
  if (typeof action === "function") {
    return action(storeApi.dispatch, storeApi.getState);
  }

  return next(action);
};
