import client from "api/client";

async function getAll() {
  const { data } = await client.get("/clients");
  return data;
}

async function getById(id) {
  const { data } = await client.get(`/clients/${id}`);
  return data;
}

async function search(searchText, pagination) {
  const { data } = await client.get("/clients/search", {
    searchText,
    ...pagination,
  });
  return data;
}

export default { getAll, getById, search };
