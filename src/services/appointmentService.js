import client from "api/client";

class AppointmentService {
  async getAll(params) {
    const { data } = await client.get("/appointments", params);
    return data;
  }

  async getById(id) {
    const { data } = await client.get(`/appointments/${id}`);
    return data;
  }

  async delete(id) {
    const { data } = await client.delete(`/appointments/${id}`);
    return data;
  }
}

export default new AppointmentService();
