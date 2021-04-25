import { fromJS } from "immutable";

export function arrayToEntities(array, fieldSelector) {
  const result = array.reduce(
    (entities, item) => ({ ...entities, [fieldSelector(item)]: item }),
    {}
  );

  return fromJS(result);
}
