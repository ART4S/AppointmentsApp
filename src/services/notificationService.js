import client from "api/client";

async function getAll(params) {
  const { data } = await client.get("/notifications", params);
  return data;
}

async function getNewCount() {
  const { data } = await client.get("/notifications/count");
  return data;
}

async function markSeen(id) {
  await client.put(`/notifications/${id}`, { seen: true });
}

export default { getAll, getNewCount, markSeen };
