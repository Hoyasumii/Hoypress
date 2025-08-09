import {
	NextResponse,
	type MiddlewareConfig,
	type NextRequest,
} from "next/server";
import { makeFind5CategoriesFactory } from "./factories/categories";
import Middleware from "@/middlewares";

export async function middleware(request: NextRequest) {
	const url = new URL(request.url);
	const middleware = new Middleware(url.pathname);

	const service = makeFind5CategoriesFactory();
	const response = NextResponse.next();

	response.cookies.set("categories", JSON.stringify(await service.run()), {
		expires: new Date(Date.now() + 1000 * 60 * 60),
	});


	if (middleware.pathIsMatchingWithRoutes()) {
		return await middleware.execute(request, response);
	}

	return response;
}

export const config: MiddlewareConfig & { runtime: string } = {
	runtime: "nodejs",
	matcher: ["/((?!_next|public|scripts|api|globals.css|favicon.ico).*)"],
};
