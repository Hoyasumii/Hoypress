import type { uuid } from "@/dtos";
import { RepositoryBase } from "./repository-base";
import type {
	CreateCategoryDTO,
	GetCategoryDTO,
	GetTitleDTO,
} from "@/dtos/categories";
import type { Prisma } from "~/generated/prisma";
import type { DefaultArgs } from "~/generated/prisma/runtime/library";

export abstract class CategoryRepositoryBase extends RepositoryBase {
	abstract create(data: CreateCategoryDTO): Promise<void>;
	abstract findById(id: uuid): Promise<GetCategoryDTO | null>;
	abstract findAll(
		orderBy?:
			| Prisma.CategoryOrderByWithRelationInput
			| Array<Prisma.CategoryOrderByWithRelationInput>,
		select?: Prisma.CategorySelect<DefaultArgs> | null | undefined,
		take?: number,
		skip?: number,
	): Promise<Array<GetCategoryDTO>>;
	abstract findUnique(
		query: Partial<CreateCategoryDTO>,
	): Promise<GetCategoryDTO | null>;
	abstract findMany(
		query: Prisma.CategoryWhereInput,
	): Promise<Array<GetCategoryDTO>>;
	abstract update(
		content: GetTitleDTO,
		query: Prisma.CategoryWhereInput,
	): Promise<number>;
  abstract deleteById(id: uuid): Promise<boolean>;
}
// TODO: Esse trecho do `partials/navbar.ejs` categories.slice(0,5) é pra ser coisa de servidor.
// TODO: Colocar o meu Portfólio em monorepo
// TODO: Colocar Redis no Portfólio + Ajeitar o Mongo para dar Timeout caso não tenha chamada durante um tempo
// TODO: Colocar Redis no Encurtai
// TODO: Colocar Redis no Perguntas e Respostas