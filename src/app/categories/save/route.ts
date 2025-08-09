import { makeCreateCategoryFactory } from "@/factories/categories";
import { NextResponse, type NextRequest } from "next/server";

// TODO: Está usando o Authenticate Middleware
export async function POST(request: NextRequest) {
	const url = new URL(request.url).origin;

	const service = makeCreateCategoryFactory();
	const formData = await request.formData();

	const title = formData.get("title")!.toString();

	try {
		await service.run({ title });

		return NextResponse.redirect(`${url}/categories`, {
			status: 301,
		});
	} catch (_) {
		return NextResponse.redirect(`${url}/categories/new`, {
			status: 301,
		});
	}
}
