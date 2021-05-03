/* eslint-disable no-param-reassign */
export function groupBy(arr, keySelector) {
  return arr.reduce((group, value, index) => {
    const key = keySelector(value, index);
    (group[key] = group[key] ?? []).push(value);
    return group;
  }, {});
}

export function selectMany(arr, arrSelector) {
  return arr.reduce((result, value) => {
    result.push(arrSelector(value));
    return result;
  }, []);
}
