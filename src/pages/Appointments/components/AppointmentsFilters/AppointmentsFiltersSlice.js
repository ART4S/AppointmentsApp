/* eslint-disable no-param-reassign */
import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import userService from "services/userService";
import clientService from "services/clientService";
import dictionaryService from "services/dictionaryService";

const appointmentStatusesAdapter = createEntityAdapter();
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

export const loadAppointmentStatuses = createAsyncThunk(
  "appointments/filters/loadAppointmentStatuses",
  () => dictionaryService.getAppointmentStatuses(),
);

const initialState = {
  filter: {
    startDate: "",
    finishDate: "",
    clientId: "",
    statusId: "",
    holderId: "",
    complaints: "",
    onlyMe: false,
  },

  users: usersAdapter.getInitialState(),
  clients: clientsAdapter.getInitialState(),
  appointmentStatuses: appointmentStatusesAdapter.getInitialState(),
};

const filtersSlice = createSlice({
  name: "appointments/filters",
  initialState,
  reducers: {
    setFilterValue(state, action) {
      const { name, value } = action.payload;
      state.filter[name] = value;
    },

    clearFilter(state) {
      state.filter = initialState.filter;
    },
  },
  extraReducers: {
    [loadUsers.fulfilled](state, action) {
      state.users = usersAdapter.setAll(state.users, action.payload);
    },

    [loadClients.fulfilled](state, action) {
      state.clients = clientsAdapter.setAll(state.clients, action.payload);
    },

    [loadAppointmentStatuses.fulfilled](state, action) {
      state.appointmentStatuses = appointmentStatusesAdapter.setAll(
        state.appointmentStatuses,
        action.payload,
      );
    },
  },
});

export const { setFilterValue, clearFilter } = filtersSlice.actions;

export const selectFilter = (state) => state.appointments.filters.filter;

export const { selectAll: selectUsers } = usersAdapter.getSelectors(
  (state) => state.appointments.filters.users,
);

export const { selectAll: selectClients } = clientsAdapter.getSelectors(
  (state) => state.appointments.filters.clients,
);

export const {
  selectAll: selectAppointmentStatuses,
} = appointmentStatusesAdapter.getSelectors(
  (state) => state.appointments.filters.appointmentStatuses,
);

export default filtersSlice.reducer;
