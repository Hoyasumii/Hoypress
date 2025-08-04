import { RedisCache } from "@/cache";
import { CategoryRepository } from "@/repositories/prisma";
import { FindAllCategoriesService } from "@/services/categories";

export function makeFindAllCategoriesFactory() {
  const cache = new RedisCache();
  const repo = new CategoryRepository(cache);

  return new FindAllCategoriesService(repo);
}