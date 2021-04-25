import { createServer } from "miragejs";

import mockAppointments from "mock/appointments";

function server() {
  createServer({
    routes() {
      this.get("/api/appointments", (schema, request) =>
        mockAppointments.get(request.queryParams)
      );
    },
  });
}

export default server;
