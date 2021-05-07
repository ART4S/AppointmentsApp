import client from "api/client";

class AppointmentService {
  getAll(params) {
    return client
      .get("/appointments", params)
      .then((response) => response.data);
  }

  delete(id) {
    return client.delete(`/appointments/${id}`);
  }
}

export default new AppointmentService();
