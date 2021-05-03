import { configureStore } from "@reduxjs/toolkit";

import { appointmentsReducer } from "features/Appointments/appointmentsSlice";

export default configureStore({
  reducer: {
    appointments: appointmentsReducer,
  },
});
