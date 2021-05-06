import { remove } from "utils/collectionUtils";

const subscribers = [];

function publish() {
  subscribers.forEach((sub) => sub());
}

function subscribe(subscriber) {
  if (!subscribers.includes(subscriber)) {
    subscribers.push(subscriber);
  }
  return () => remove(subscribers, subscriber);
}

export default { publish, subscribe };
