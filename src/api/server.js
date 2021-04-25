import { createServer } from "miragejs";

import mockAppointments from "mock/appointments";
import mockAppointmetStatuses from "mock/dictionaries/appointmentStatuses";

function server() {
  createServer({
    routes() {
      this.get("/api/appointments", (schema, request) =>
        mockAppointments.get(request.queryParams)
      );

      this.get("/api/dictionaries/appointmentStatuses", () =>
        mockAppointmetStatuses.get()
      );
    },
  });
}

export default server;
