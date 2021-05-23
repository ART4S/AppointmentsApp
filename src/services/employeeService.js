import client from "api/client";

class EmployeeService {
  async getAll() {
    const { data } = await client.get("/employees");
    return data;
  }

  async getById(id) {
    const { data } = await client.get(`/employees/${id}`);
    return data;
  }
}

export default new EmployeeService();
