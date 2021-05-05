import appointmentStatuses from "../data/dictionaries/appointmentStatuses";

class DictionariesController {
  getAppointmentStatuses() {
    return appointmentStatuses;
  }
}

export default new DictionariesController();
