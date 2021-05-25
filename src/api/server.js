/* eslint-disable no-new */
/* eslint-disable arrow-body-style */
import { Server, Response } from "miragejs";

import appointments from "mock/controllers/appointmentsController";
import employees from "mock/controllers/employeesController";
import events from "mock/controllers/eventsController";
import clients from "mock/controllers/clientsController";
import auth from "mock/controllers/authController";
import ServerError from "common/errors/ServerError";
import ValidationError from "common/errors/ValidationError";

new Server({
  routes() {
    this.timing = 3000;

    this.get("/api/appointments", (_schema, request) => {
      // return new Response(500, {}, { message: "server unavaliable" });
      // return new Response(401, {}, { message: "unauthorized" });
      return appointments.getAll(request.queryParams);
    });
    this.get("/api/appointments/:id", (_schema, request) => {
      return appointments.getById(request.params.id);
    });
    this.post("/api/appointments", (_schema, request) => {
      try {
        const id = appointments.create(JSON.parse(request.requestBody));
        return new Response(200, {}, id);
      } catch (e) {
        if (e instanceof ServerError) {
          return new Response(400, {}, { error: e.message });
        }

        if (e instanceof ValidationError) {
          return new Response(400, {}, { error: e.error });
        }

        throw e;
      }
    });
    this.put("/api/appointments/:id", (_schema, request) => {
      try {
        appointments.update(request.params.id, JSON.parse(request.requestBody));
        return new Response(200);
      } catch (e) {
        if (e instanceof ServerError) {
          return new Response(400, {}, { error: e.message });
        }

        if (e instanceof ValidationError) {
          return new Response(400, {}, { error: e.error });
        }

        throw e;
      }
    });
    this.delete("/api/appointments/:id", (_schema, request) => {
      appointments.delete(request.params.id);
    });

    this.get("/api/employees", () => employees.getAll());
    this.get("/api/employees/:id", (_schema, request) =>
      employees.getById(request.params.id),
    );

    this.get("/api/clients", () => clients.getAll());
    this.get("/api/clients/:id", (_schema, request) =>
      clients.getById(request.params.id),
    );
    this.get("/api/clients/search", (_schema, request) =>
      clients.search(request.queryParams),
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

    this.get("/api/events", (_schema, request) =>
      events.getAll(request.queryParams),
    );
    this.put("/api/events/:id", (_schema, request) =>
      events.update(request.params.id, JSON.parse(request.requestBody)),
    );
  },
});
