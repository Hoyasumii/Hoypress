import errorHandler from "@/errors";

export abstract class RepositoryBase {
	public readonly errors = errorHandler;
}
