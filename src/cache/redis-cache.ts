import type { CacheBase } from "./cache-base";
import { redis } from "@/utils";

export class RedisCache implements CacheBase {
	async set<ContentType>(
		key: string,
		value: ContentType,
		opts?: {
			ex: number;
		},
	): Promise<void> {
		if (opts) {
			await redis.set(key, value, { ...opts });

			return;
		}

		await redis.set(key, value);
	}

	async get<ContentType = unknown>(key: string): Promise<ContentType | null> {
		return await redis.get<ContentType>(key);
	}
}
