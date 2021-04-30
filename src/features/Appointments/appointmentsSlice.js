/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";

import appointmentService from "services/appointmentService";
import LOADING_STATUSES from "constants";

export const appointmentsAdapter = createEntityAdapter();

const initialState = {
  status: LOADING_STATUSES.idle,
  error: null,
  dataSource: appointmentsAdapter.getInitialState({
    filter: {
      startDate: "",
      finishDate: "",
      clientName: "",
      onlyMe: false,
      statusId: "",
      holderId: "",
      complaints: "",
    },
  }),
};

const load = createAsyncThunk("appointments/load", (filter) => appointmentService.getAll(filter));

const appointmentsSlice = createSlice({
  name: "appointments",

  initialState,

  reducers: {
    setFilterValue(state, action) {
      const { name, value } = action.payload;
      state.dataSource.filter[name] = value;
    },

    clearFilter(state) {
      state.dataSource.filter = initialState.dataSource.filter;
    },
  },

  extraReducers: {
    [load.pending](state) {
      state.status = LOADING_STATUSES.loading;
    },

    [load.fulfilled](state, action) {
      state.status = LOADING_STATUSES.idle;
      state.entities = appointmentsAdapter.setAll(state.dataSource, action.payload);
    },

    [load.rejected](state, { payload }) {
      state.status = LOADING_STATUSES.error;
      state.error = payload.error.message;
    },
  },
});

export const appointmentsReducer = appointmentsSlice.reducer;

export const appointmentsActions = { load, ...appointmentsSlice.actions };

export const appointmentsSelectors = {
  selectFilter: (state) => state.appointments.dataSource.filter,
  ...appointmentsAdapter.getSelectors((state) => state.appointments.dataSource),
};

export default appointmentsSlice;
