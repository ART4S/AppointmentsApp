/* eslint-disable import/prefer-default-export */

function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function getFullName(user) {
  return [user.lastName, user.firstName, user.middleName]
    .filter((x) => x)
    .map(capitalizeFirstLetter)
    .join(" ");
}
