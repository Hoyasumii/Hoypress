import type { CacheBase } from "@/cache";
import { RepositoryBase } from "./repository-base";

export abstract class CacheableRepositoryBase extends RepositoryBase {
  constructor(public cache: CacheBase) {
    super();
  }
}