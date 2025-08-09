import { makeUserExists } from "@/factories/users";
import { VerifyJwtToken } from "@/services/jwt";
import { NextResponse, type NextRequest } from "next/server";

export async function authenticate(
	request: NextRequest,
	response?: NextResponse,
): Promise<NextResponse> {
	const verifyingToken = new VerifyJwtToken();
	const userExistsService = makeUserExists();

	const currentToken = request.cookies.get("access-token")!.value;

	const { userId } = await verifyingToken.run<{ userId: string }>(currentToken);

	const userExists = await userExistsService.run(userId);

	if (!userExists) {
		return NextResponse.redirect("/users/login");
	}

	response = response ?? NextResponse.next();
	return response;
}
