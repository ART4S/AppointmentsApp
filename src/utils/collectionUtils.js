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

export function repeat(n, valueGetter) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(valueGetter());
  }
  return arr;
}

export function remove(arr, item) {
  const index = arr.indexOf(item);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
