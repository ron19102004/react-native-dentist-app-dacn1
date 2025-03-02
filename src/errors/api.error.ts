interface ApiErrorConstructorParameter {
  message: string;
}
export default class ApiError extends Error {
  constructor(private readonly param: ApiErrorConstructorParameter) {
    super(param.message);
  }
  getError() {
    return this.param;
  }
}
