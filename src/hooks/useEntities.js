import { useSelector } from "react-redux";

export default function useEntities(entitiesSelector) {
  const entities = useSelector(entitiesSelector);
  return Object.values(entities.toJS());
}
