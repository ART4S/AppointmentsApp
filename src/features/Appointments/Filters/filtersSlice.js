/* eslint-disable no-param-reassign */
import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import userService from "services/userService";
import clientService from "services/clientService";
import appointmentStatusService from "services/appointmentStatusService";

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
  () => appointmentStatusService.getAll(),
);

const initialState = {
  users: usersAdapter.getInitialState({
    isLoading: false,
    error: false,
  }),

  clients: clientsAdapter.getInitialState({
    isLoading: false,
    error: false,
  }),

  appointmentStatuses: appointmentStatusesAdapter.getInitialState({
    isLoading: false,
    error: false,
  }),

  filter: {
    startDate: "",
    finishDate: "",
    clientId: "",
    statusId: "",
    holderId: "",
    complaints: "",
    onlyMe: false,
  },
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
    [loadUsers.pending](state) {
      state.users.isLoading = true;
    },

    [loadUsers.fulfilled](state, action) {
      state.users.isLoading = false;
      state.users.error = false;
      state.users = usersAdapter.setAll(state.users, action.payload);
    },

    [loadUsers.rejected](state) {
      state.users.isLoading = false;
      state.users.error = true;
    },

    [loadClients.pending](state) {
      state.clients.isLoading = true;
    },

    [loadClients.fulfilled](state, action) {
      state.clients.isLoading = false;
      state.clients.error = false;
      state.clients = clientsAdapter.setAll(state.clients, action.payload);
    },

    [loadClients.rejected](state) {
      state.clients.isLoading = false;
      state.clients.error = true;
    },

    [loadAppointmentStatuses.pending](state) {
      state.appointmentStatuses.isLoading = true;
    },

    [loadAppointmentStatuses.fulfilled](state, action) {
      state.appointmentStatuses.isLoading = false;
      state.appointmentStatuses.error = false;
      state.appointmentStatuses = appointmentStatusesAdapter.setAll(
        state.appointmentStatuses,
        action.payload,
      );
    },

    [loadAppointmentStatuses.rejected](state) {
      state.appointmentStatuses.isLoading = false;
      state.appointmentStatuses.error = true;
    },
  },
});

export const filtersReducer = filtersSlice.reducer;

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

export default filtersSlice;
