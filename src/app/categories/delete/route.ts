import { makeDeleteCategoryFactoty } from "@/factories/categories";
import { NextResponse, type NextRequest } from "next/server";

// TODO: ele tem o Authenticate Middleware
export async function DELETE(request: NextRequest) {
	const url = new URL(request.url).origin;
	const service = makeDeleteCategoryFactoty();
	const formData = await request.formData();

	const id = formData.get("id")!;

	try {
		await service.run(id.toString());
	} catch (_) {}

	return NextResponse.redirect(`${url}/categories`);
}
