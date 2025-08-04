import type { GetCategoryDTO } from "@/dtos/categories";
import type { CategoryRepositoryBase } from "@/repositories";

export class FindFirst5CategoriesService {
	constructor(private repository: CategoryRepositoryBase) {}

	async run(): Promise<Array<GetCategoryDTO>> {
		return await this.repository.findAll(
			{},
			{ id: true, title: true, slug: true },
			5,
		);
	}
}
