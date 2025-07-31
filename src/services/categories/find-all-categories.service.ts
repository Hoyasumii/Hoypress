import type { GetCategoryDTO } from "@/dtos/categories";
import type { CategoryRepositoryBase } from "@/repositories";
import type { Service } from "@/services";
import { redis } from "@/utils";

export class FindAllCategoriesService
	implements Service<CategoryRepositoryBase, void, Array<GetCategoryDTO>>
{
	constructor(private repository: CategoryRepositoryBase) {}

	async run(): Promise<Array<GetCategoryDTO>> {
		const cachedResponse = await redis.get<Array<GetCategoryDTO>>(
			"find-all-categories-service-response",
		);

		if (cachedResponse) {
			return cachedResponse;
		}

		const response = await this.repository.findAll(
			{ id: "desc" },
			{ id: true, title: true, slug: true },
		);

		await redis.set("find-all-categories-service-response", response, {
			ex: 60 * 3,
		});

		return response;
	}
}
