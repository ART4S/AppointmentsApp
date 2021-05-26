/* eslint-disable no-param-reassign */
import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { notificationService } from "services";

const adapter = createEntityAdapter();

const initialState = {
  busy: false,
  error: false,
  selectedNotification: null,
  data: adapter.getInitialState({}),
  pagination: {
    currentPage: 0,
    pageSize: 0,
    totalItems: 0,
    itemsPerPage: 5,
    availableItemsPerPage: [5, 15, 25],
  },
  sorting: {
    field: "date",
    order: "desc",
  },
};

export const loadNotifications = createAsyncThunk(
  "notifications/table/loadNotifications",
  (_params, thunkApi) => {
    const { sorting, pagination } = thunkApi.getState().notifications.table;

    return notificationService.getAll({
      ...sorting,
      ...pagination,
    });
  },
);

const tableSlice = createSlice({
  name: "notifications/table",
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

    setSelectedNotification(state, action) {
      state.selectedNotification = action.payload;
    },
  },
  extraReducers: {
    [loadNotifications.pending](state) {
      state.busy = true;
      state.error = false;
    },

    [loadNotifications.fulfilled](state, action) {
      const { data, currentPage, pageSize, totalItems } = action.payload;
      state.busy = false;
      state.data = adapter.setAll(state.data, data);
      state.pagination.pageSize = pageSize;
      state.pagination.totalItems = totalItems;
      state.pagination.currentPage = currentPage;

      const [first] = data;
      state.selectedNotification = first;
    },

    [loadNotifications.rejected](state) {
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
  setSelectedNotification,
} = tableSlice.actions;

const selectState = (state) => state.notifications.table;

export const { selectAll: selectNotifications } = adapter.getSelectors(
  (state) => selectState(state).data,
);

export const selectBusy = (state) => selectState(state).busy;

export const selectError = (state) => selectState(state).data.error;

export const selectPagination = (state) => selectState(state).pagination;

export const selectSorting = (state) => selectState(state).sorting;

export const selectNotification = (state) =>
  selectState(state).selectedNotification;

export default tableSlice.reducer;
