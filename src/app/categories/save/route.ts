import { makeCreateCategoryFactory } from "@/factories/categories";
import { NextResponse, type NextRequest } from "next/server";

// TODO: Está usando o Authenticate Middleware
export async function POST(request: NextRequest) {
	const service = makeCreateCategoryFactory();
	const formData = await request.formData();

	const title = formData.get("title")!.toString();

	try {
		await service.run({ title });

		return NextResponse.redirect("/categories");
	} catch (_) {
		return NextResponse.redirect("/categories/new");
	}
}
