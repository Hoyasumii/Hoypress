import { makeUpdateCategoryFactory } from "@/factories/categories";
import { NextResponse, type NextRequest } from "next/server";

// TODO: Adicionar o Authenticate Middleware
export async function POST(request: NextRequest) {
	const service = makeUpdateCategoryFactory();
	const formData = await request.formData();

	const id = formData.get("id")!;
	const title = formData.get("title")!;

	await service.run(
		{ title: title.toString() },
		{
			id: id.toString(),
		},
	);

  return NextResponse.redirect("/categories");
}
