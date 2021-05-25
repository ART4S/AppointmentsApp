/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import userService from "services/employeeService";

export const loadUsers = createAsyncThunk(
  "appointments/filters/loadUsers",
  () => userService.getAll(),
);

const initialState = {
  filter: {
    startDate: "",
    finishDate: "",
    status: "",
    clientId: "",
    holderId: "",
    complaints: "",
    onlyMe: false,
  },
  client: null,
  holder: null,
};

const filtersSlice = createSlice({
  name: "appointments/filters",
  initialState,
  reducers: {
    setFilterValue(state, action) {
      const { name, value } = action.payload;
      state.filter[name] = value;
    },

    clearFilter(state) {
      state.filter = initialState.filter;
      state.client = null;
      state.holder = null;
    },

    setClient(state, action) {
      const client = action.payload;
      state.client = client;
      state.filter.clientId = client?.id ?? "";
    },

    setHolder(state, action) {
      const holder = action.payload;
      state.holder = holder;
      state.filter.holderId = holder?.id ?? "";
    },
  },
});

export const {
  setFilterValue,
  clearFilter,
  setClient,
  setHolder,
} = filtersSlice.actions;

export const selectFilter = (state) => state.appointments.filters.filter;

export const selectClient = (state) => state.appointments.filters.client;

export const selectHolder = (state) => state.appointments.filters.holder;

export default filtersSlice.reducer;
