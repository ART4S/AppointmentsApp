/* eslint-disable no-param-reassign */
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import LOADING_STATUSES from "constants/loadingStatuses";

import appointmentStatusService from "services/appointmentStatusService";

export const appointmentStatusesAdapter = createEntityAdapter();

const initialState = {
  status: LOADING_STATUSES.idle,
  error: null,
  dataSource: appointmentStatusesAdapter.getInitialState(),
};

export const loadAppointmentStatuses = createAsyncThunk(
  "appointmentStatuses/load",
  () => appointmentStatusService.getAll(),
);

const appointmentStatusesSlice = createSlice({
  name: "appointmentStatuses",

  initialState,

  extraReducers: {
    [loadAppointmentStatuses.pending](state) {
      state.status = LOADING_STATUSES.loading;
    },

    [loadAppointmentStatuses.fulfilled](state, action) {
      state.status = LOADING_STATUSES.idle;
      state.dataSource = appointmentStatusesAdapter.setAll(
        state.dataSource,
        action.payload,
      );
    },

    [loadAppointmentStatuses.rejected](state, action) {
      state.status = LOADING_STATUSES.error;
      state.error = action.error.message;
    },
  },
});

export const appointmentStatusesReducer = appointmentStatusesSlice.reducer;

export const {
  selectIds: selectAppointmentStatusIds,
  selectAll: selectAllAppointmentStatuses,
  selectById: selectAppointmentStatusById,
} = appointmentStatusesAdapter.getSelectors(
  (state) => state.appointmentStatuses.dataSource,
);

export default appointmentStatusesSlice;
