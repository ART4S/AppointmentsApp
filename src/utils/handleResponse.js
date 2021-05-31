import ClientError from "common/errors/ClientError";

export default async function handleResponse(promiseGetter) {
  let response;
  try {
    response = await promiseGetter();
  } catch (e) {
    response = e.response;
  }

  const { status, data } = response;

  if (status >= 200 && status < 300) {
    return { isSuccess: true, data };
  }

  if (status >= 400 && status < 500) {
    return { isSuccess: false, data };
  }

  throw new ClientError(`unhandled status: ${status}`);
}
