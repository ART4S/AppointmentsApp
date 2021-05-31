import { configureStore } from "@reduxjs/toolkit";

import appointmentsReducer from "pages/Appointments/appointmentsSlice";
import eventsReducer from "pages/Events/eventsSlice";
import notificationsReducer from "pages/Notifications/notificationsSlice";

export default configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    appointments: appointmentsReducer,
    events: eventsReducer,
    notifications: notificationsReducer,
  },
});
