import { BadRequestError } from "./bad-request.error";
import { ExistentUserError } from "./existent-user.error";
import { ResourceNotFoundError } from "./resource-not-found.error";
import { UnauthorizedRequestError } from "./unauthorized-request.error";

export { ApplicationError } from "./application.error";
export { BadRequestError } from "./bad-request.error";
export { UnauthorizedRequestError } from "./unauthorized-request.error";
export { ResourceNotFoundError } from "./resource-not-found.error";

export default {
	UnauthorizedRequestError: () => new UnauthorizedRequestError(),
	BadRequestError: () => new BadRequestError(),
	ResourceNotFoundError: () => new ResourceNotFoundError(),
	ExistentUserError: () => new ExistentUserError(),
} as const;
