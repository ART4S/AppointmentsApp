export default function normalize(array, fieldSelector) {
  return array.reduce(
    (entities, item) => ({ ...entities, [fieldSelector(item)]: item }),
    {},
  );
}
