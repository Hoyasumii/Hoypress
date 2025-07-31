export interface CacheBase {
	set<ContentType>(
		key: string,
		value: ContentType,
		opts?: {
			ex?: number;
		},
	): Promise<void>;
	get<ContentType = unknown>(key: string): Promise<ContentType | null>;
}
