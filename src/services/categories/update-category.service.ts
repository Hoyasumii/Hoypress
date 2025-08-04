import { GetTitleDTO } from "@/dtos/categories";
import type { CategoryRepositoryBase } from "@/repositories";
import type { Prisma } from "~/generated/prisma";

export class UpdateCategoryService {
	constructor(private repository: CategoryRepositoryBase) {}

	async run(
		data: GetTitleDTO,
		where: Prisma.CategoryWhereInput,
	): Promise<boolean> {
		const { success } = GetTitleDTO.safeParse(data);

		if (!success) throw this.repository.errors.BadRequestError();

		return (await this.repository.update(data, where)) >= 1;
	}
}
