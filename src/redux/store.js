import { configureStore } from "@reduxjs/toolkit";

import appointmentsReducer from "pages/Appointments/appointmentsSlice";

export default configureStore({
  reducer: {
    appointments: appointmentsReducer,
  },
});
