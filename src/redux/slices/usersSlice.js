/* eslint-disable no-param-reassign */
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import LOADING_STATUSES from "constants/loadingStatuses";

import userService from "services/userService";

export const usersAdapter = createEntityAdapter();

const initialState = {
  status: LOADING_STATUSES.idle,
  error: null,
  dataSource: usersAdapter.getInitialState(),
};

export const loadUsers = createAsyncThunk("users/load", () =>
  userService.getAll(),
);

const usersSlice = createSlice({
  name: "users",

  initialState,

  extraReducers: {
    [loadUsers.pending](state) {
      state.status = LOADING_STATUSES.loading;
    },

    [loadUsers.fulfilled](state, action) {
      state.status = LOADING_STATUSES.idle;
      usersAdapter.setAll(state.dataSource, action.payload);
    },

    [loadUsers.rejected](state, action) {
      state.status = LOADING_STATUSES.error;
      state.error = action.error.message;
    },
  },
});

export const usersReducer = usersSlice.reducer;

export const {
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: selectTotalUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors((state) => state.users.dataSource);

export default usersSlice;
