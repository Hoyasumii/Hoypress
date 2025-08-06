import { viewsPath } from "@/constants";
import { EJSRR } from "@/utils";
import { renderFile } from "ejs";
import type { NextRequest } from "next/server";

// TODO: Está usando o Authenticate Middleware
export async function GET(request: NextRequest) {
	const page = await renderFile(`${viewsPath}/categories/new.ejs`, {
		isAuthenticated: Boolean(request.cookies.get("access-token")),
		title: "Nova Categoria",
		categories: [],
	});

  return EJSRR(page);
}
