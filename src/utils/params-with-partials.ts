import { viewsPath } from "@/constants";

export function paramsWithPartials(params: object) {
	return {
		...params,
		header: `${viewsPath}/partials/header.ejs`,
		navbar: `${viewsPath}/partials/navbar.ejs`,
		footer: `${viewsPath}/partials/footer.ejs`,
	};
}
