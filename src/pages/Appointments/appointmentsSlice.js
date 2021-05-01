/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";

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

export const loadAppointments = createAsyncThunk(
  "appointments/load",
  (filter) => appointmentService.getAll(filter),
);

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
    [loadAppointments.pending](state) {
      state.status = LOADING_STATUSES.loading;
    },

    [loadAppointments.fulfilled](state, action) {
      state.status = LOADING_STATUSES.idle;
      state.entities = appointmentsAdapter.setAll(
        state.dataSource,
        action.payload,
      );
    },

    [loadAppointments.rejected](state, { payload }) {
      state.status = LOADING_STATUSES.error;
      state.error = payload.error.message;
    },
  },
});

export const appointmentsReducer = appointmentsSlice.reducer;

export const { setFilterValue, clearFilter } = appointmentsSlice.actions;

export const selectFilter = (state) => state.appointments.dataSource.filter;

export const {
  selectIds: selectAppointmentIds,
  selectEntities: selectAppointmentEntities,
  selectAll: selectAllAppointments,
  selectTotal: selectTotalAppointments,
  selectById: selectAppointmentById,
} = appointmentsAdapter.getSelectors((state) => state.appointments.dataSource);

export default appointmentsSlice;
