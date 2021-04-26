import { createSelector } from "reselect";

export const getAppointments = (state) =>
  state.appointments.list.dataSource.entities;

export const getFilter = (state) => state.appointments.list.dataSource.filter;
