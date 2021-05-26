import { configureStore } from "@reduxjs/toolkit";

import appointmentsReducer from "pages/Appointments/appointmentsSlice";
import eventsReducer from "pages/Events/eventsSlice";
import notificationsReducer from "pages/Notifications/notificationsSlice";

export default configureStore({
  reducer: {
    appointments: appointmentsReducer,
    events: eventsReducer,
    notifications: notificationsReducer,
  },
});
