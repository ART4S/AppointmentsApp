import { configureStore } from "@reduxjs/toolkit";

import { appointmentsReducer } from "features/Appointments/appointmentsSlice";
import { usersReducer } from "./slices/usersSlice";
import { appointmentStatusesReducer } from "./slices/appointmentStatusesSlice";

export default configureStore({
  reducer: {
    appointments: appointmentsReducer,
    appointmentStatuses: appointmentStatusesReducer,
    users: usersReducer,
  },
});
