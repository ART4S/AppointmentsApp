/* eslint-disable no-new */
/* eslint-disable arrow-body-style */
import { Server, Response } from "miragejs";

import appointments from "mock/controllers/appointmentsController";
import users from "mock/controllers/usersController";
import clients from "mock/controllers/clientsController";
import auth from "mock/controllers/authController";
import ServerError from "common/errors/serverError";
import ValidationError from "common/errors/validationError";

new Server({
  routes() {
    // this.timing = 3000;

    this.get("/api/appointments", (_schema, request) => {
      // return new Response(500, {}, { message: "server unavaliable" });
      // return new Response(401, {}, { message: "unauthorized" });
      return appointments.getAll(request.queryParams);
    });
    this.get("/api/appointments/:id", (_schema, request) => {
      return appointments.getById(request.params.id);
    });
    this.put("/api/appointments/:id", (_schema, request) => {
      try {
        appointments.update(request.params.id, JSON.parse(request.requestBody));
      } catch (e) {
        if (e instanceof ServerError) {
          return new Response(400, {}, { error: e.message });
        }

        if (e instanceof ValidationError) {
          return new Response(400, {}, { error: e.error });
        }
      }

      return new Response(200);
    });
    this.delete("/api/appointments/:id", (_schema, request) => {
      appointments.delete(request.params.id);
    });

    this.get("/api/users", () => users.getAll());

    this.get("/api/clients", () => clients.getAll());
    this.get("/api/clients/search", (_schema, request) =>
      clients.search(request.queryParams.searchText),
    );

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
  },
});
