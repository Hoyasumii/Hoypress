import type { uuid } from "@/dtos";
import type {
	CreateCategoryDTO,
	GetCategoryDTO,
	GetTitleDTO,
} from "@/dtos/categories";
import { CategoryRepositoryBase } from "@/repositories";
import { prisma } from "@/utils";
import type { Prisma } from "~/generated/prisma";
import type { DefaultArgs } from "~/generated/prisma/runtime/library";

export class CategoryRepository extends CategoryRepositoryBase {
	async create(data: CreateCategoryDTO): Promise<void> {
		await prisma.category.create({ data });
	}

	async findById(id: uuid): Promise<GetCategoryDTO | null> {
		return await prisma.category.findUnique({ where: { id } });
	}

	async findAll(
		orderBy?:
			| Prisma.CategoryOrderByWithRelationInput
			| Array<Prisma.CategoryOrderByWithRelationInput>,
		select?: Prisma.CategorySelect<DefaultArgs> | null | undefined,
		take?: number,
		skip?: number,
	): Promise<Array<GetCategoryDTO>> {
		return await prisma.category.findMany({ orderBy, select, take, skip });
	}

	async findUnique(
		where: Partial<CreateCategoryDTO>,
	): Promise<GetCategoryDTO | null> {
		const findCategory = await prisma.category.findMany({ where });

		if (findCategory.length === 0) return null;

		return findCategory[0];
	}

	async findMany(
		where: Prisma.CategoryWhereInput,
	): Promise<Array<GetCategoryDTO>> {
		return await prisma.category.findMany({ where });
	}

	async update(
		data: GetTitleDTO,
		where: Prisma.CategoryWhereInput,
	): Promise<number> {
		const updatedCategories = await prisma.category.updateManyAndReturn({
			where,
			data,
		});

		return updatedCategories.length;
	}

	async deleteById(id: uuid): Promise<boolean> {
		try {
			await prisma.category.delete({ where: { id } });
			return true;
		} catch (_) {
			return false;
		}
	}
}
