/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";

import LOADING_STATUSES from "constants/loadingStatuses";

import appointmentStatusService from "services/appointmentStatusService";

export const appointmentStatusesAdapter = createEntityAdapter();

const initialState = {
  status: LOADING_STATUSES.idle,
  error: null,
  dataSource: appointmentStatusesAdapter.getInitialState(),
};

const load = createAsyncThunk("appointmentStatuses/load", () => appointmentStatusService.getAll());

const appointmentStatusesSlice = createSlice({
  name: "appointmentStatuses",

  initialState,

  extraReducers: {
    [load.pending](state) {
      state.status = LOADING_STATUSES.loading;
    },

    [load.fulfilled](state, action) {
      state.status = LOADING_STATUSES.idle;
      state.dataSource = appointmentStatusesAdapter.setAll(state.dataSource, action.payload);
    },

    [load.rejected](state, action) {
      state.status = LOADING_STATUSES.error;
      state.error = action.error.message;
    },
  },
});

export const appointmentStatusesReducer = appointmentStatusesSlice.reducer;

export const appointmentStatusesActions = {
  load,
  ...appointmentStatusesSlice.actions,
};

export const appointmentStatusesSelectors = {
  ...appointmentStatusesAdapter.getSelectors((state) => state.appointmentStatuses.dataSource),
};

export default appointmentStatusesSlice;
