import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { thunkMiddleware } from "./middleware";

import appointments from "./appointments/reducer";

const reducer = combineReducers({
  appointments,
});

const enhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = createStore(reducer, enhancer);

export default store;
