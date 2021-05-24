import { configureStore } from "@reduxjs/toolkit";

import appointmentsReducer from "pages/Appointments/appointmentsSlice";
import eventsReducer from "pages/Events/eventsSlice";

export default configureStore({
  reducer: {
    appointments: appointmentsReducer,
    events: eventsReducer,
  },
});
