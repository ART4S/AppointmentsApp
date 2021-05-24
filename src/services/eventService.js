import client from "api/client";

async function getAll(params) {
  const { data } = await client.get("/events", params);
  return data;
}

export default { getAll };
