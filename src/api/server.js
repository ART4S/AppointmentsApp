/* eslint-disable no-new */
/* eslint-disable arrow-body-style */
import { Server, Response } from "miragejs";

import appointments from "mock/controllers/appointmentsController";
import dictionaries from "mock/controllers/dictionariesController";
import users from "mock/controllers/usersController";
import clients from "mock/controllers/clientsController";
import auth from "mock/controllers/authController";
import ServerError from "common/errors/responseError";

new Server({
  routes() {
    this.get("/api/appointments", (_schema, request) => {
      // return new Response(500, {}, { error: "server unavaliable" });
      // return new Response(401, {}, { error: "unauthorized" });
      return appointments.getAll(request.queryParams);
    });

    this.get("/api/dictionaries/appointmentStatuses", () =>
      dictionaries.getAppointmentStatuses(),
    );

    this.get("/api/users", () => users.getAll());

    this.get("/api/clients", () => clients.getAll());

    this.put("/api/auth/login", (_schema, request) => {
      const { email, password } = JSON.parse(request.requestBody);
      try {
        return auth.login(email, password);
      } catch (e) {
        if (e instanceof ServerError) {
          return new Response(400, {}, { error: e.message });
        }
        throw e;
      }
    });

    this.delete("/api/appointments/:id", (_schema, request) => {
      appointments.delete(request.params.id);
    });
  },
});
