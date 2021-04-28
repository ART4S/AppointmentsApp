import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { thunkMiddleware } from "./middleware";

import users from "./users/reducer";
import appointments from "./appointments/reducer";
import dictionaries from "./dictionaries/reducer";

const reducer = combineReducers({
  users,
  appointments,
  dictionaries,
});

const enhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = createStore(reducer, enhancer);

export default store;
