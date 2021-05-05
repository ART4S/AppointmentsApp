import { configureStore } from "@reduxjs/toolkit";

import { appointmentsReducer } from "pages/Appointments/appointmentsSlice";
import { loginReducer } from "pages/Login/loginSlice";

export default configureStore({
  reducer: {
    login: loginReducer,
    appointments: appointmentsReducer,
  },
});
