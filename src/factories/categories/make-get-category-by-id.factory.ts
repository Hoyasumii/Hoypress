import { RedisCache } from "@/cache";
import { CategoryRepository } from "@/repositories/prisma";
import { GetCategoryByIdService } from "@/services/categories";

export function makeGetCategoryByIdFactory() {
	const cache = new RedisCache();
	const repo = new CategoryRepository(cache);

	return new GetCategoryByIdService(repo);
}
