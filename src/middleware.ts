import { NextResponse, type MiddlewareConfig, type NextRequest } from "next/server";
import { makeFind5CategoriesFactory } from "./factories/categories";

export async function middleware(request: NextRequest) {
  const service = makeFind5CategoriesFactory();

  console.log(await service.run());

  console.log(new URL(request.url).pathname);

  // console.log("Hello Middleware");
  return NextResponse.next();
}

export const config: MiddlewareConfig & { runtime: string } = {
  runtime: "nodejs",
  matcher: ["/((?!_next|public|scripts|api|globals.css|favicon.ico).*)"],
}
