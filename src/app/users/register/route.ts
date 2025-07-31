import { viewsPath } from "@/constants";
import { makeCreateUserFactory } from "@/factories/users";
import { EJSRR, paramsWithPartials } from "@/utils";
import { renderFile } from "ejs";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

export async function GET() {
	const pageContent = await renderFile(
		`${viewsPath}/users/access.ejs`,
		paramsWithPartials({
			register: true,
			title: "Crie a sua Conta",
			isAuthenticated: false,
			categories: [],
		}),
	);

	return EJSRR(pageContent);
}

export async function POST(request: NextRequest) {
	const service = makeCreateUserFactory();

	const formData = await request.formData();

	const email = formData.get("email")!;
	const password = formData.get("password")!;

	await service.run({ email: email.toString(), password: password.toString() });

	redirect("/users/login");
}
