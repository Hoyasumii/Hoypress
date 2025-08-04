import { RedisCache } from "@/cache";
import { CategoryRepository } from "@/repositories/prisma";
import { DeleteCategoryService } from "@/services/categories";

export function makeDeleteCategoryFactoty() {
  const cache = new RedisCache();
  const repo = new CategoryRepository(cache);
  
  return new DeleteCategoryService(repo);
}