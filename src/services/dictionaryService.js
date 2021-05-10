import client from "api/client";

class DictionaryService {
  async getAppointmentStatuses() {
    const { data } = await client.get("/dictionaries/appointmentStatuses");
    return data;
  }
}

export default new DictionaryService();
