import client from "api/client";

async function getAll(params) {
  const { data } = await client.get("/events", params);
  return data;
}

async function markSeen(eventIds) {
  await client.put("/events/markSeen", { ids: eventIds });
}

async function getNewCount() {
  const { data } = await client.get("/events/count");
  return data;
}

export default { getAll, markSeen, getNewCount };
