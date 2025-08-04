import { RedisCache } from "@/cache";
import { CategoryRepository } from "@/repositories/prisma";
import { UpdateCategoryService } from "@/services/categories";

export function makeUpdateCategoryFactory() {
	const cache = new RedisCache();
	const repo = new CategoryRepository(cache);

  return new UpdateCategoryService(repo);
}
