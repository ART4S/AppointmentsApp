import client from "api/client";

class AppointmentService {
  getAll(filter) {
    return client
      .get("/appointments", filter)
      .then((response) => response.data);
  }
}

export default new AppointmentService();
