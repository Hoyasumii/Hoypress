import { viewsPath } from "@/constants";
import { makeGetCategoryBySlugFactory } from "@/factories/categories";
import { renderFile } from "ejs";
import type { NextRequest } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ slug: string }> },
) {
	const { slug } = await params;

  const service = makeGetCategoryBySlugFactory();

  const category = await service.run(slug);

	await renderFile(`${viewsPath}/articles/index`, {
		data: [],
		
	})


}
