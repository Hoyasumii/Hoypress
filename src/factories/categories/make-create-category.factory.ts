import { RedisCache } from "@/cache";
import { CategoryRepository } from "@/repositories/prisma";
import { CreateCategoryService } from "@/services/categories";

export function makeCreateCategoryFactory() {
  const cache = new RedisCache();
  const repo = new CategoryRepository(cache);
  
  return new CreateCategoryService(repo);
}