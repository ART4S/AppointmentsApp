/* eslint-disable no-param-reassign */
import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import appointmentService from "services/appointmentService";

const appointmentsAdapter = createEntityAdapter();

const initialState = {
  data: appointmentsAdapter.getInitialState({
    isLoading: false,
    error: false,
  }),

  pagination: {
    currentPage: 0,
    itemsPerPage: 5,
    avaliableItemsPerPage: [5, 15, 25],
    pageSize: null,
    totalItems: null,
  },

  sorting: {
    order: "asc",
    field: "",
  },
};

export const loadAppointments = createAsyncThunk(
  "appointments/table/loadAppointments",
  (_, { getState }) => {
    const state = getState();
    const { sorting, pagination } = state.appointments.table;
    const { filter } = state.appointments.filters;

    return appointmentService.getAll({ ...filter, ...sorting, ...pagination });
  },
);

const tableSlice = createSlice({
  name: "table",

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

      if (!state.pagination.avaliableItemsPerPage.includes(itemsPerPage)) {
        [itemsPerPage] = state.pagination.avaliableItemsPerPage;
      }

      state.pagination.itemsPerPage = itemsPerPage;
    },
  },

  extraReducers: {
    [loadAppointments.pending](state) {
      state.data.isLoading = true;
    },

    [loadAppointments.fulfilled](state, action) {
      const { data, pageSize, totalItems } = action.payload;
      state.data.isLoading = false;
      state.data.error = false;
      state.data = appointmentsAdapter.setAll(state.data, data);
      state.pagination.pageSize = pageSize;
      state.pagination.totalItems = totalItems;
    },

    [loadAppointments.rejected](state) {
      state.data.isLoading = false;
      state.data.error = true;
    },
  },
});

export const tableReducer = tableSlice.reducer;

export const {
  setSorting,
  setCurrentPage,
  setItemsPerPage,
} = tableSlice.actions;

export const {
  selectIds: selectAppointmentIds,
  selectAll: selectAllAppointments,
  selectById: selectAppointmentById,
} = appointmentsAdapter.getSelectors((state) => state.appointments.table.data);

export const selectSorting = (state) => state.appointments.table.sorting;

export const selectPagination = (state) => state.appointments.table.pagination;

export const selectAppointmentsIsLoading = (state) =>
  state.appointments.table.data.isLoading;

export default tableSlice;
