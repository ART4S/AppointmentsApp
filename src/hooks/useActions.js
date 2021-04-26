import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

export default function useActions(actions) {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
}
