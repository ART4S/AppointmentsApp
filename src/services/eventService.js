import client from "api/client";

async function getAll(params) {
  const { data } = await client.get("/events", params);
  return data;
}

function markSeen(id) {
  return client.put(`/events/${id}`, { seen: true });
}

export default { getAll, markSeen };
