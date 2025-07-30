import type { Service } from "@/services";
import jwt from "jsonwebtoken";

export class VerifyJwtToken implements Service<null, string, boolean> {
	public repository = null;

	public async run<TargetType>(
		jwtToken: string,
	): Promise<jwt.JwtPayload & TargetType> {
		return jwt.verify(jwtToken, process.env.JWT_PRIVATE_KEY) as jwt.JwtPayload &
			TargetType;
	}
}
