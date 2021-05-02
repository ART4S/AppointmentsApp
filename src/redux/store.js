import { configureStore } from "@reduxjs/toolkit";

import { appointmentsReducer } from "features/Appointments/appointmentsSlice";
import { usersReducer } from "./slices/usersSlice";
import { appointmentStatusesReducer } from "./slices/appointmentStatusesSlice";
import { clientsReducer } from "./slices/clientsSlice";

export default configureStore({
  reducer: {
    appointments: appointmentsReducer,
    appointmentStatuses: appointmentStatusesReducer,
    users: usersReducer,
    clients: clientsReducer,
  },
});
