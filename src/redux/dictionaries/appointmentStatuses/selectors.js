import { entitiesToArray } from "utils";

export const getAppointmentStatuses = (state) =>
  entitiesToArray(state.dictionaries.appointmentStatuses);
