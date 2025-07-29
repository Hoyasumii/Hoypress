import { HTTP } from "@/enums";

export abstract class ApplicationError extends Error {
	constructor(
		name: string,
		message: string = name,
		public status: HTTP | number = HTTP.INTERNAL_SERVER_ERROR,
	) {
		super(message);

		this.name = name;
	}
}
