export default function getFullName(user) {
  let fullName = "";
  if (!user) return fullName;
  if (user.firstName) fullName += user.firstName;
  if (user.middleName) fullName += ` ${user.middleName}`;
  if (user.lastName) fullName += ` ${user.lastName}`;
  return fullName.trim();
}
