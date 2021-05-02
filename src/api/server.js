import { createServer } from "miragejs";

import mockAppointments from "mock/appointments";
import mockAppointmetStatuses from "mock/dictionaries/appointmentStatuses";
import mockUsers from "mock/users";
import mockClients from "mock/clients";

function server() {
  createServer({
    routes() {
      this.get("/api/appointments", (schema, request) =>
        mockAppointments.getAll(request.queryParams),
      );

      this.get("/api/dictionaries/appointmentStatuses", () =>
        mockAppointmetStatuses.getAll(),
      );

      this.get("/api/users", () => mockUsers.getAll());

      this.get("/api/clients", () => mockClients.getAll());
    },
  });
}

export default server;
