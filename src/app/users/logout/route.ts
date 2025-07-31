import { viewsPath } from "@/constants";
import { EJSRR } from "@/utils";
import { renderFile } from "ejs";

export async function GET() {
	const page = await renderFile(`${viewsPath}/users/login-redirect.ejs`);

	const response = EJSRR(page);
	
	response.cookies.delete("access-token");

	return response;
}
