import { createSelector } from "reselect";

import converter from "utils/entitiesConverter";

export const getAppointments = (state) =>
  converter.entitiesToArray(state.appointments.list.dataSource.entities);

export const getFilter = (state) =>
  state.appointments.list.dataSource.filter.toJS();
