import { NextResponse } from "next/server";

export function EJSRR(pageContent: string): NextResponse {
	return new NextResponse(pageContent, {
		headers: {
			"Content-Type": "text/html; charset=UTF8",
		},
	});
}
