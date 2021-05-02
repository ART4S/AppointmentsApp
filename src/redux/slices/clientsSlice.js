/* eslint-disable no-param-reassign */
import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import LOADING_STATUSES from "constants/loadingStatuses";

import clientService from "services/clientService";

export const clientsAdapter = createEntityAdapter();

const initialState = {
  status: LOADING_STATUSES.idle,
  error: null,
  dataSource: clientsAdapter.getInitialState(),
};

export const loadClients = createAsyncThunk("clients/load", (thunkApi) =>
  clientService.getAll(),
);

const clientsSlice = createSlice({
  name: "clients",

  initialState,

  extraReducers: {
    [loadClients.pending](state) {
      state.status = LOADING_STATUSES.loading;
    },

    [loadClients.fulfilled](state, action) {
      state.status = LOADING_STATUSES.idle;
      state.dataSource = clientsAdapter.setAll(
        state.dataSource,
        action.payload,
      );
    },

    [loadClients.rejected](state, action) {
      state.status = LOADING_STATUSES.fail;
      state.error = action.error;
    },
  },
});

export const clientsReducer = clientsSlice.reducer;

export const {
  selectIds: selectClientIds,
  selectAll: selectAllClients,
  selectById: selectClientById,
} = clientsAdapter.getSelectors((state) => state.clients.dataSource);

export default clientsSlice;
