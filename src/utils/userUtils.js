/* eslint-disable import/prefer-default-export */

export function getFullName(user) {
  return [user.lastName, user.firstName, user.middleName]
    .filter((x) => x)
    .join(" ");
}
