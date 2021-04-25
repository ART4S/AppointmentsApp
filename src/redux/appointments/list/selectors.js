import { createSelector } from "reselect";

import { entitiesToArray } from "utils";

export const getAppointments = (state) =>
  entitiesToArray(state.appointments.list.dataSource.entities);

export const getFilter = (state) =>
  state.appointments.list.dataSource.filter.toJS();
