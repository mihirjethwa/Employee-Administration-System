export class ApiResponse {
  constructor() {
    this.status = { code: 200, message: "success" };
    this.data = {};
  }
  data: unknown | {};
  status: unknown | {};
}
