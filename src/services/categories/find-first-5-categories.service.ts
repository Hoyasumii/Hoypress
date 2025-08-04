import type { GetCategoryDTO } from "@/dtos/categories";
import type { CategoryRepositoryBase } from "@/repositories";

export class FindFirst5CategoriesService {
	constructor(private repository: CategoryRepositoryBase) {}

	async run(): Promise<Array<GetCategoryDTO>> {
		const cachedCategories =
			await this.repository.cache.get<Array<GetCategoryDTO>>(
				"first-5-categories",
			);

		if (cachedCategories) {
			return cachedCategories;
		}

		const categories = await this.repository.findAll(
			{},
			{ id: true, title: true, slug: true },
			5,
		);

		await this.repository.cache.set("first-5-categories", categories, {
			ex: 60 * 60 * 24,
		});

		return categories;
	}
}
