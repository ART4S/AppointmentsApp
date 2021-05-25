/* eslint-disable no-param-reassign */
import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { appointmentService } from "services";

const appointmentsAdapter = createEntityAdapter();

const initialState = {
  busy: false,
  error: false,
  data: appointmentsAdapter.getInitialState({}),
  pagination: {
    currentPage: 0,
    pageSize: 0,
    totalItems: 0,
    itemsPerPage: 5,
    availableItemsPerPage: [5, 15, 25],
  },
  sorting: {
    field: "",
    order: "asc",
  },
  selectedAppointment: null,
};

export const loadAppointments = createAsyncThunk(
  "appointments/table/loadAppointments",
  (_params, thunkApi) => {
    const state = thunkApi.getState();
    const { sorting, pagination } = state.appointments.table;
    const { filter } = state.appointments.filters;

    return appointmentService.getAll({
      ...filter,
      ...sorting,
      ...pagination,
    });
  },
);

const tableSlice = createSlice({
  name: "appointments/table",
  initialState,
  reducers: {
    setSorting(state, action) {
      state.sorting = action.payload;
    },

    setCurrentPage(state, action) {
      state.pagination.currentPage = action.payload;
    },

    setItemsPerPage(state, action) {
      let itemsPerPage = action.payload;

      if (!state.pagination.availableItemsPerPage.includes(itemsPerPage)) {
        [itemsPerPage] = state.pagination.availableItemsPerPage;
      }

      state.pagination.itemsPerPage = itemsPerPage;
    },

    clearError(state) {
      state.error = false;
    },

    setSelectedAppointment(state, action) {
      state.selectedAppointment = action.payload;
    },

    setBusy(state, action) {
      state.busy = action.payload;
    },
  },
  extraReducers: {
    [loadAppointments.pending](state) {
      state.busy = true;
      state.error = false;
    },

    [loadAppointments.fulfilled](state, action) {
      const { data, currentPage, pageSize, totalItems } = action.payload;
      state.busy = false;
      state.data = appointmentsAdapter.setAll(state.data, data);
      state.pagination.pageSize = pageSize;
      state.pagination.totalItems = totalItems;
      state.pagination.currentPage = currentPage;

      const [first] = data;
      state.selectedAppointment = first;
    },

    [loadAppointments.rejected](state) {
      state.busy = false;
      state.error = true;
    },
  },
});

export const {
  setBusy,
  setSorting,
  setCurrentPage,
  setItemsPerPage,
  clearError,
  setSelectedAppointment,
} = tableSlice.actions;

export const deleteAppointment = createAsyncThunk(
  "appointments/table/deleteAppointment",
  async (id, { dispatch }) => {
    dispatch(setBusy(true));
    await appointmentService.deleteItem(id);
    await dispatch(loadAppointments());
    dispatch(setBusy(false));
  },
);

export const {
  selectAll: selectAppointments,
} = appointmentsAdapter.getSelectors((state) => state.appointments.table.data);

export const selectBusy = (state) => state.appointments.table.busy;

export const selectError = (state) => state.appointments.table.data.error;

export const selectAppointment = (state) =>
  state.appointments.table.selectedAppointment;

export const selectPagination = (state) => state.appointments.table.pagination;

export const selectSorting = (state) => state.appointments.table.sorting;

export default tableSlice.reducer;
