import type { CacheBase } from "@/cache";
import errorHandler from "@/errors";

export class RepositoryBase {
	public readonly errors = errorHandler;

	constructor(public cache?: CacheBase) {}
}
