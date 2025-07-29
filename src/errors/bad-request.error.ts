import { ApplicationError } from "./application.error";

export class BadRequestError extends ApplicationError {
  constructor() {
    super("Bad Request Error", "Bad Request Error", 400);
  }
}
