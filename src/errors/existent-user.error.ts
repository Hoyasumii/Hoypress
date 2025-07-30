import { HTTP } from "@/enums";
import { ApplicationError } from "./application.error";

export class ExistentUserError extends ApplicationError {
	constructor() {
		super("Existent User Error", "Existent User Error", HTTP.CONFLICT);
	}
}
