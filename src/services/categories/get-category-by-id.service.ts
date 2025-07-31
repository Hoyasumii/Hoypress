import { uuid } from "@/dtos";
import type { GetCategoryDTO } from "@/dtos/categories";
import type { CategoryRepositoryBase } from "@/repositories";
import type { Service } from "@/services";

export class GetCategoryByIdService
	implements Service<CategoryRepositoryBase, uuid, GetCategoryDTO>
{
	constructor(private repository: CategoryRepositoryBase) {}

	async run(data: uuid): Promise<GetCategoryDTO> {
		const { success } = uuid.safeParse(data);

		if (!success) throw this.repository.errors.BadRequestError();

		const categoryContent = await this.repository.findById(data);

		if (!categoryContent) throw this.repository.errors.ResourceNotFoundError();

		return categoryContent;
	}
}
