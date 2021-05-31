import client from "api/client";
import handleResponse from "utils/handleResponse";

async function getAll(params) {
  const { data } = await client.get("/appointments", params);
  return data;
}

async function getById(id) {
  const { data } = await client.get(`/appointments/${id}`);
  return data;
}

function create(appointment) {
  return handleResponse(() => client.post("/appointments", appointment));
}

function update(id, appointment) {
  return handleResponse(() => client.put(`/appointments/${id}`, appointment));
}

async function deleteItem(id) {
  const { data } = await client.delete(`/appointments/${id}`);
  return data;
}

export default { getAll, getById, create, update, deleteItem };
