import { RedisCache } from "@/cache";
import { CategoryRepository } from "@/repositories/prisma";
import { GetCategoryBySlugService } from "@/services/categories";

export function makeGetCategoryBySlugFactory() {
	const cache = new RedisCache();
	const repo = new CategoryRepository(cache);

	return new GetCategoryBySlugService(repo);
}
