/* eslint-disable import/prefer-default-export */
import { combineReducers } from "@reduxjs/toolkit";

import { tableReducer } from "./components/AppointmentsTable/appointmentsTableSlice";
import { filtersReducer } from "./components/AppointmentsFilters/AppointmentsFiltersSlice";

export const appointmentsReducer = combineReducers({
  filters: filtersReducer,
  table: tableReducer,
});
