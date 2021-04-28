import { fromJS } from "immutable";

export default function normalize(array, fieldSelector) {
  const result = array.reduce(
    (entities, item) => ({ ...entities, [fieldSelector(item)]: item }),
    {},
  );

  return fromJS(result);
}
