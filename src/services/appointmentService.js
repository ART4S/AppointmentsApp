import client from "api/client";

class AppointmentService {
  getAll(params) {
    return client
      .get("/appointments", params)
      .then((response) => response.data);
  }
}

export default new AppointmentService();
