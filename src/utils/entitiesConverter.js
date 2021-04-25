import { fromJS } from "immutable";

function arrayToEntities(array, fieldSelector) {
  const result = array.reduce(
    (entities, item) => ({ ...entities, [fieldSelector(item)]: item }),
    {}
  );

  return fromJS(result);
}

function entitiesToArray(entities) {
  return Object.values(entities.toJS());
}

export default { arrayToEntities, entitiesToArray };
