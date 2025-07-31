import type { GetCategoryDTO } from "@/dtos/categories";
import type { CategoryRepositoryBase } from "@/repositories";
import type { Service } from "@/services";

export class FindAllCategoriesService
	implements Service<CategoryRepositoryBase, void, Array<GetCategoryDTO>>
{
	constructor(private repository: CategoryRepositoryBase) {}

	async run(): Promise<Array<GetCategoryDTO>> {
		if (!this.repository.cache) {
			const response = await this.repository.findAll(
				{ id: "desc" },
				{ id: true, title: true, slug: true },
			);

			return response;
		}

		const cachedResponse = await this.repository.cache.get<
			Array<GetCategoryDTO>
		>("find-all-categories-service-response");

		if (cachedResponse) return cachedResponse;

		const response = await this.repository.findAll(
			{ id: "desc" },
			{ id: true, title: true, slug: true },
		);

		await this.repository.cache.set(
			"find-all-categories-service-response",
			response,
			{
				ex: 60 * 3,
			},
		);

		return response;
	}
}
