import { RedisCache } from "@/cache";
import { CategoryRepository } from "@/repositories/prisma";
import { FindFirst5CategoriesService } from "@/services/categories";

export function makeFind5CategoriesFactory() {
	const cache = new RedisCache();
	const repo = new CategoryRepository(cache);

	return new FindFirst5CategoriesService(repo);
}
