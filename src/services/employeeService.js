import client from "api/client";

async function getAll() {
  const { data } = await client.get("/employees");
  return data;
}

async function getById(id) {
  const { data } = await client.get(`/employees/${id}`);
  return data;
}

export default { getAll, getById };
