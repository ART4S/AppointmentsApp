import client from "api/client";

class AppointmentService {
  getAll(filter) {
    return client
      .get("/appointments", filter)
      .then((response) => response.data)
      .catch((error) => []);
  }
}

export default new AppointmentService();
