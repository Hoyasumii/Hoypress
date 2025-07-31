import { viewsPath } from "@/constants";
import { makeAuthenticateUserFactory } from "@/factories/users";
import { EJSRR } from "@/utils";
import { renderFile } from "ejs";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
	const service = makeAuthenticateUserFactory();

	const formData = await request.formData();

	const email = formData.get("email")!;
	const password = formData.get("password")!;

	const page = await renderFile(`${viewsPath}/users/login-redirect.ejs`);

	try {
		const response = EJSRR(page);

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

		return response;
	} catch (_) {
		return redirect("/users/login");
	}
}
