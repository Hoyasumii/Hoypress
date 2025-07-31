import { GetTitleDTO } from "@/dtos/categories";
import type { CategoryRepositoryBase } from "@/repositories";
import type { Service } from "@/services";
import slugify from "slugify";

export class CreateCategoryService
	implements Service<CategoryRepositoryBase, GetTitleDTO, void>
{
	constructor(private repository: CategoryRepositoryBase) {}

	async run(data: GetTitleDTO): Promise<void> {
		const { success } = GetTitleDTO.safeParse(data);

		if (!success) throw this.repository.errors.BadRequestError();

		await this.repository.create({
			createdAt: new Date().toISOString(),
			slug: slugify(data.title, { lower: true }),
			title: data.title,
		});
	}
}
