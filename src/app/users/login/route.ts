import { viewsPath } from "@/constants";
import { EJSRR, paramsWithPartials } from "@/utils";
import { renderFile } from "ejs";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const pageContent = await renderFile(
		`${viewsPath}/users/access.ejs`,
		paramsWithPartials({
			register: false,
			title: `Acessar Conta`,
			isAuthenticated: false,
			categories: JSON.parse(request.cookies.get("categories")!.value),
		}),
	);

	return EJSRR(pageContent);
}
