/* eslint-disable no-param-reassign */
import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { eventService } from "services";

const adapter = createEntityAdapter();

const initialState = {
  busy: false,
  error: false,
  selectedEvent: null,
  data: adapter.getInitialState({}),
  seenEventIds: [],
  pagination: {
    currentPage: 0,
    pageSize: 0,
    totalItems: 0,
    itemsPerPage: 15,
    availableItemsPerPage: [5, 15, 25],
  },
  sorting: {
    field: "",
    order: "asc",
  },
};

export const loadEvents = createAsyncThunk(
  "events/table/loadEvents",
  (_params, thunkApi) => {
    const { sorting, pagination } = thunkApi.getState().events.table;

    return eventService.getAll({
      ...sorting,
      ...pagination,
    });
  },
);

export const sendSeenEvents = createAsyncThunk(
  "events/table/markSeenEvents",
  (_params, thunkApi) => {
    const { seenEventIds } = thunkApi.getState().events.table;
    return eventService.markSeen(seenEventIds);
  },
);

const tableSlice = createSlice({
  name: "events/table",
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

    setSelectedEvent(state, action) {
      state.selectedEvent = action.payload;
    },

    markSeen(state, action) {
      const event = action.payload;
      state.data.entities[event.id].seen = true;
      state.seenEventIds.push(event.id);
    },
  },
  extraReducers: {
    [loadEvents.pending](state) {
      state.busy = true;
      state.error = false;
    },

    [loadEvents.fulfilled](state, action) {
      const { data, currentPage, pageSize, totalItems } = action.payload;
      state.busy = false;
      state.data = adapter.setAll(state.data, data);
      state.pagination.pageSize = pageSize;
      state.pagination.totalItems = totalItems;
      state.pagination.currentPage = currentPage;

      const [first] = data;
      state.selectedEvent = first;
    },

    [loadEvents.rejected](state) {
      state.busy = false;
      state.error = true;
    },

    [sendSeenEvents.fulfilled](state) {
      state.seenEventIds = [];
    },
  },
});

export const {
  setBusy,
  setSorting,
  setCurrentPage,
  setItemsPerPage,
  clearError,
  setSelectedEvent,
  markSeen,
} = tableSlice.actions;

export const { selectAll: selectEvents } = adapter.getSelectors(
  (state) => state.events.table.data,
);

export const selectBusy = (state) => state.events.table.busy;

export const selectError = (state) => state.events.table.data.error;

export const selectEvent = (state) => state.events.table.selectedEvent;

export const selectPagination = (state) => state.events.table.pagination;

export const selectSorting = (state) => state.events.table.sorting;

export const selectSeenEventIds = (state) => state.events.table.seenEventIds;

export default tableSlice.reducer;
