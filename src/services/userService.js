import client from "api/client";

async function getById(id) {
  const { data } = await client.get(`/users/${id}`);
  return data;
}

export default { getById };
