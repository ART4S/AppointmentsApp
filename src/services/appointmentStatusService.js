import client from "api/client";

class AppointmentStatusService {
  getAll() {
    return client
      .get("/dictionaries/appointmentStatuses")
      .then((response) => response.data);
  }
}

export default new AppointmentStatusService();
