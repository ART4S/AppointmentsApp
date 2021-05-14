import client from "api/client";
import { handleResponse } from "utils/responseUtils";

class AppointmentService {
  async getAll(params) {
    const { data } = await client.get("/appointments", params);
    return data;
  }

  async getById(id) {
    const { data } = await client.get(`/appointments/${id}`);
    return data;
  }

  update(id, appointment) {
    return handleResponse(() => client.put(`/appointments/${id}`, appointment));
  }

  async delete(id) {
    const { data } = await client.delete(`/appointments/${id}`);
    return data;
  }
}

export default new AppointmentService();
