export function EJSRR(pageContent: string): Response {
	return new Response(pageContent, {
		headers: {
			"Content-Type": "text/html; charset=UTF8",
		},
	});
}
