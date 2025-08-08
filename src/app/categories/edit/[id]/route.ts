import { viewsPath } from "@/constants";
import { makeGetCategoryByIdFactory } from "@/factories/categories";
import { EJSRR } from "@/utils";
import { renderFile } from "ejs";
import type { NextRequest } from "next/server";

// TODO: Ele usa o Authenticate Middleware
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	const service = makeGetCategoryByIdFactory();
	const { id } = await params;

	try {
		const data = await service.run(id);

		const page = await renderFile(`${viewsPath}/categories/edit.ejs`, {
			data,
			title: "Editar Categoria",
			isAuthenticated: Boolean(request.cookies.get("access-token")),
			categories: [],
		});

		return EJSRR(page);
	} catch (_) {
		const page = await renderFile(`${viewsPath}/error.ejs`, {
			title: "Erro",
			isAuthenticated: Boolean(request.cookies.get("access-token")),
			categories: [],
		});

		return EJSRR(page);
	}
}
