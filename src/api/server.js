/* eslint-disable arrow-body-style */
import { createServer, Response } from "miragejs";

import appointments from "mock/controllers/appointmentsController";
import dictionaries from "mock/controllers/dictionariesController";
import users from "mock/controllers/usersController";
import clients from "mock/controllers/clientsController";
import auth from "mock/controllers/authController";

function server() {
  createServer({
    routes() {
      this.get("/api/appointments", (_, request) => {
        // return new Response(500, {}, { error: "server unavaliable" });
        return appointments.getAll(request.queryParams);
      });

      this.get("/api/dictionaries/appointmentStatuses", () =>
        dictionaries.getAppointmentStatuses(),
      );

      this.get("/api/users", () => users.getAll());

      this.get("/api/clients", () => clients.getAll());

      this.put("/api/auth", (schema, request) => {
        const { login, password } = JSON.parse(request.requestBody);
        return auth.login(login, password);
      });
    },
  });
}

export default server;
