import { combineReducers } from "@reduxjs/toolkit";

import tableReducer from "./components/AppointmentsTable/appointmentsTableSlice";
import filtersReducer from "./components/AppointmentsFilters/appointmentsFiltersSlice";

export default combineReducers({
  filters: filtersReducer,
  table: tableReducer,
});
