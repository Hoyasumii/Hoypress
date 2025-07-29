import { viewsPath } from "@/constants";
import { EJSRR, paramsWithPartials } from "@/utils";
import { renderFile } from "ejs";

export async function GET() {
  const pageContent = await renderFile(`${viewsPath}/users/access.ejs`, paramsWithPartials({
    register: false,
    title: `Acessar Conta`,
    isAuthenticated: false,
    categories: []
  }))

  return EJSRR(pageContent);
}