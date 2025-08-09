import { viewsPath } from "@/constants";
import { EJSRR, paramsWithPartials } from "@/utils";
import { renderFile } from "ejs";
import type { NextRequest } from "next/server";

// TODO: Está usando o Authenticate Middleware
export async function GET(request: NextRequest) {
	const page = await renderFile(
		`${viewsPath}/categories/new.ejs`,
		paramsWithPartials({
			isAuthenticated: Boolean(request.cookies.get("access-token")),
			title: "Nova Categoria",
			categories: JSON.parse(request.cookies.get("categories")!.value),
		}),
	);

	return EJSRR(page);
}
