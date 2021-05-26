import client from "api/client";

async function getAll(params) {
  const { data } = await client.get("/events", params);
  return data;
}

async function getNewCount() {
  const { data } = await client.get("/events/count");
  return data;
}

async function markSeen(eventIds) {
  await client.put("/events/markSeen", { ids: eventIds });
}

export default { getAll, getNewCount, markSeen };
