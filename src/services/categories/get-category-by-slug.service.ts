import type { GetCategoryDTO } from "@/dtos/categories";
import type { CategoryRepositoryBase } from "@/repositories";
import type { Service } from "@/services";
import z from "zod";

export class GetCategoryBySlugService
	implements Service<CategoryRepositoryBase, string, GetCategoryDTO>
{
	constructor(private repository: CategoryRepositoryBase) {}

	async run(data: string): Promise<GetCategoryDTO> {
		const { success } = z.string().safeParse(data);

		if (!success) throw this.repository.errors.BadRequestError();

		const cachedResponse = await this.repository.cache.get<GetCategoryDTO>(
			`category-slug#${data}`,
		);

		if (cachedResponse) return cachedResponse;

		const categoryContent = await this.repository.findUnique({ slug: data });

		if (!categoryContent) throw this.repository.errors.ResourceNotFoundError();

		await this.repository.cache.set(`category-slug#${data}`, categoryContent, {
			ex: 60 * 60,
		});

		return categoryContent;
	}
}
