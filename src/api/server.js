/* eslint-disable no-new */
/* eslint-disable arrow-body-style */
import { Server, Response } from "miragejs";

import ServerError from "common/errors/ServerError";
import ValidationError from "common/errors/ValidationError";

import appointments from "mock/controllers/appointmentsController";
import employees from "mock/controllers/employeesController";
import events from "mock/controllers/eventsController";
import clients from "mock/controllers/clientsController";
import auth from "mock/controllers/authController";
import notifications from "mock/controllers/notificationsController";
import users from "mock/controllers/usersController";

new Server({
  urlPrefix: process.env.REACT_APP_API_URL,
  routes() {
    this.timing = 1000;

    this.get("/appointments", (_schema, request) => {
      // return new Response(500, {}, { message: "server unavaliable" });
      // return new Response(401, {}, { message: "unauthorized" });
      // eslint-disable-next-line no-unreachable
      const { employeeId } = auth.extractUser(request);
      return appointments.getAll({
        ...request.queryParams,
        userId: employeeId,
      });
    });
    this.get("/appointments/:id", (_schema, request) => {
      return appointments.getById(request.params.id);
    });
    this.post("/appointments", (_schema, request) => {
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
    this.put("/appointments/:id", (_schema, request) => {
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
    this.delete("/appointments/:id", (_schema, request) => {
      appointments.delete(request.params.id);
    });

    this.get("/employees", () => employees.getAll());
    this.get("/employees/:id", (_schema, request) =>
      employees.getById(request.params.id),
    );

    this.get("/clients", () => clients.getAll());
    this.get("/clients/:id", (_schema, request) =>
      clients.getById(request.params.id),
    );
    this.get("/clients/search", (_schema, request) =>
      clients.search(request.queryParams),
    );

    this.put("/auth/login", (_schema, request) => {
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

    this.get("/events", (_schema, request) =>
      events.getAll(request.queryParams),
    );
    this.get("/events/count", () => events.getNewCount());
    this.put("/events/:id", (_schema, request) =>
      events.update(request.params.id, JSON.parse(request.requestBody)),
    );
    this.put("/events/markSeen", (_schema, request) => {
      const { ids } = JSON.parse(request.requestBody);
      events.markSeen(ids);
    });

    this.get("/notifications", (_schema, request) =>
      notifications.getAll(request.queryParams),
    );
    this.put("/notifications/:id", (_schema, request) =>
      notifications.update(request.params.id, JSON.parse(request.requestBody)),
    );

    this.get("/users/:id", (_schema, request) => {
      return users.getById(request.params.id);
    });
  },
});
