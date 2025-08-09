import { viewsPath } from "@/constants";
import { makeFindAllCategoriesFactory } from "@/factories/categories";
import { EJSRR, paramsWithPartials } from "@/utils";
import { renderFile } from "ejs";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const service = makeFindAllCategoriesFactory();
	const allCategories = await service.run();

	const page = await renderFile(
		`${viewsPath}/categories/index.ejs`,
		paramsWithPartials({
			data: allCategories,
			isAuthenticated: Boolean(request.cookies.get("access-token")),
			title: "Categorias",
			categories: JSON.parse(request.cookies.get("categories")!.value),
		}),
	);

	return EJSRR(page);
}

// TODO: Criar uma validação de JWT para toda rota que usá-la.
