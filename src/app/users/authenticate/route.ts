import { viewsPath } from "@/constants";
import { makeAuthenticateUserFactory } from "@/factories/users";
import { EJSRR } from "@/utils";
import { renderFile } from "ejs";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
	const service = makeAuthenticateUserFactory();

	const formData = await request.formData();

	const email = formData.get("email")!;
	const password = formData.get("password")!;

	const page = await renderFile(`${viewsPath}/users/login-redirect.ejs`);

	try {
		const response = new NextResponse(page, {
			headers: {
				"Content-Type": "text/html; charset=UTF-8",
			},
		});

		const userToken = await service.run({
			email: email.toString(),
			password: password.toString(),
		});

		response.cookies.set("access-token", userToken, {
			expires: new Date(Date.now() + 1000 * 60 * 60),
			maxAge: 60 * 60,
			path: "/",
			httpOnly: false,
			secure: false,
			
		});

		// response.cookies.set("access-token", userToken, {
		// 	expires: 1000 * 60 * 60,
		// 	path: "/",
		// 	httpOnly: true
		// });

		return response;
	} catch (_) {
		return NextResponse.redirect(new URL("/", request.url));
	}
}
