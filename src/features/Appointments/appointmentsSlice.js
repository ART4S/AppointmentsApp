/* eslint-disable import/prefer-default-export */
import { combineReducers } from "@reduxjs/toolkit";

import { tableReducer } from "./Table/tableSlice";
import { filtersReducer } from "./Filters/filtersSlice";

export const appointmentsReducer = combineReducers({
  filters: filtersReducer,
  table: tableReducer,
});
