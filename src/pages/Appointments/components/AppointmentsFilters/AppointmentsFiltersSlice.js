/* eslint-disable no-param-reassign */
import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import userService from "services/userService";
import clientService from "services/clientService";

const usersAdapter = createEntityAdapter();
const clientsAdapter = createEntityAdapter();

export const loadUsers = createAsyncThunk(
  "appointments/filters/loadUsers",
  () => userService.getAll(),
);

export const loadClients = createAsyncThunk(
  "appointments/filters/loadClients",
  () => clientService.getAll(),
);

const initialState = {
  busy: false,
  filter: {
    startDate: "",
    finishDate: "",
    status: "",
    clientId: "",
    holderId: "",
    complaints: "",
    onlyMe: false,
  },
  users: usersAdapter.getInitialState(),
  clients: clientsAdapter.getInitialState(),
};

const filtersSlice = createSlice({
  name: "appointments/filters",
  initialState,
  reducers: {
    setBusy(state, action) {
      state.busy = action.payload;
    },

    setFilterValue(state, action) {
      const { name, value } = action.payload;
      state.filter[name] = value;
    },

    clearFilter(state) {
      state.filter = initialState.filter;
      state.applyed = false;
    },
  },
  extraReducers: {
    [loadUsers.fulfilled](state, action) {
      state.users = usersAdapter.setAll(state.users, action.payload);
    },

    [loadClients.fulfilled](state, action) {
      state.clients = clientsAdapter.setAll(state.clients, action.payload);
    },
  },
});

export const { setBusy, setFilterValue, clearFilter } = filtersSlice.actions;

export const selectBusy = (state) => state.appointments.filters.busy;

export const selectFilter = (state) => state.appointments.filters.filter;

export const { selectAll: selectUsers } = usersAdapter.getSelectors(
  (state) => state.appointments.filters.users,
);

export const { selectAll: selectClients } = clientsAdapter.getSelectors(
  (state) => state.appointments.filters.clients,
);

export default filtersSlice.reducer;
