/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";

import LOADING_STATUSES from "constants/loadingStatuses";

import userService from "services/userService";

export const usersAdapter = createEntityAdapter();

const initialState = {
  status: LOADING_STATUSES.idle,
  error: null,
  dataSource: usersAdapter.getInitialState(),
};

const load = createAsyncThunk("users/load", () => userService.getAll());

const usersSlice = createSlice({
  name: "users",

  initialState,

  extraReducers: {
    [load.pending](state) {
      state.status = LOADING_STATUSES.loading;
    },

    [load.fulfilled](state, action) {
      state.status = LOADING_STATUSES.idle;
      usersAdapter.setAll(state.dataSource, action.payload);
    },

    [load.rejected](state, action) {
      state.status = LOADING_STATUSES.error;
      state.error = action.error.message;
    },
  },
});

export const usersReducer = usersSlice.reducer;

export const usersActions = { load, ...usersSlice.actions };

export const usersSelectors = {
  ...usersAdapter.getSelectors((state) => state.users.dataSource),
};

export default usersSlice;
