export default function pickFrom(array) {
  const index = Math.trunc(Math.random() * array.length);
  return array[index];
}
