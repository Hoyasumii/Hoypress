import { ApplicationError } from "./application.error";

export class UnauthorizedRequestError extends ApplicationError {
	constructor() {
		super("Unauthorized Request Error", "Unauthorized Request Error", 401);
	}
}
