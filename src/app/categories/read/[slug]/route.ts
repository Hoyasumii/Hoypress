import { viewsPath } from "@/constants";
import { makeGetCategoryBySlugFactory } from "@/factories/categories";
import { EJSRR, paramsWithPartials } from "@/utils";
import { renderFile } from "ejs";
import type { NextRequest } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ slug: string }> },
) {
	const { slug } = await params;

	const service = makeGetCategoryBySlugFactory();

	const category = await service.run(slug);

	const page = await renderFile(`${viewsPath}/articles/index.ejs`, paramsWithPartials({
		data: [],
		slug,
		hasSlug: true,
		isAuthenticated: Boolean(request.cookies.get("access-token")),
		title: category.title,
		categories: JSON.parse(request.cookies.get("categories")!.value),
	}));

	return EJSRR(page);
}

// TODO: Revisar essas Categories
