import type { NextRequest, NextResponse } from "next/server";
import { authenticate } from "./authenticate.middleware";

const routes: Array<RegExp> = [
	/\/categories\/new/,
	/\/categories\/save/,
	/\/categories\/delete/,
	/^\/categories\/edit\/([^/]+)$/,
	/\/categories\/update/,
	/\/articles\/new/,
	/\/articles\/save/,
	/^\/articles\/read\/([^/+]$)/,
	/\/articles\/delete/,
	/^\/articles\/edit\/([^/+]$)/,
	/\/articles\/update/,
];

export default class Middleware {
	constructor(private path: string) {}

	pathIsMatchingWithRoutes(): boolean {
		const response = routes.find((route) => route.test(this.path));
		return Boolean(response);
	}

	async execute(request: NextRequest, response: NextResponse) {
		return await authenticate(request, response);
	}
}
