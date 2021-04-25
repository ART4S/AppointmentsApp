export default function createConstants(...keys) {
  return Object.freeze(keys.reduce((acc, key) => ({ ...acc, [key]: key }), {}));
}
