import { viewsPath } from "@/constants";
import { EJSRR, paramsWithPartials } from "@/utils";
import { renderFile } from "ejs";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const pageContent = await renderFile(
		`${viewsPath}/articles/index.ejs`,
		paramsWithPartials({
			data: [],
			isAuthenticated: Boolean(request.cookies.get("access-token")),
			hasSlug: false,
			title: "Artigos",
			categories: JSON.parse(request.cookies.get("categories")!.value),
		}),
	);

	return EJSRR(pageContent);
}
