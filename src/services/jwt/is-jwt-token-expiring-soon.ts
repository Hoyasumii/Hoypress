import type { Service } from "@/services";
import jwt from "jsonwebtoken";

export class IsJwtTokenExpiringSoon implements Service<null, string, boolean> {
	public repository = null;
	public limitTime = 60 * 15;

	public async run(token: string): Promise<boolean> {
		const jwtTokenVerified = jwt.verify(
			token,
			process.env.JWT_PRIVATE_KEY,
		) as jwt.JwtPayload;

		const now = Math.floor(Date.now() / 1000);

		return jwtTokenVerified.exp! - now <= this.limitTime;
	}
}
