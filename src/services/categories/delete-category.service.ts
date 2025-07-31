import { uuid } from "@/dtos";
import type { CategoryRepositoryBase } from "@/repositories";
import type { Service } from "@/services";

export class DeleteCategoryService
	implements Service<CategoryRepositoryBase, uuid, boolean>
{
	constructor(private repository: CategoryRepositoryBase) {}

	async run(id: uuid): Promise<boolean> {
		const { success } = uuid.safeParse(id);

		if (!success) throw this.repository.errors.BadRequestError();

		return await this.repository.deleteById(id);
	}
}
