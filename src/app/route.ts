import { viewsPath } from "@/constants";
import { EJSRR, paramsWithPartials } from "@/utils";
import { renderFile } from "ejs";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {

	const pageContent = await renderFile(
		`${viewsPath}/index.ejs`,
		paramsWithPartials({
			data: [],
			currentPage: 1,
			numberOfPages: 1,
			title: "Página Inicial",
			isAuthenticated: Boolean(request.cookies.get("access-token")),
			categories: [],
		}),
	);

	return EJSRR(pageContent);
}
