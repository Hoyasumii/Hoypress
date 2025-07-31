import { UsersRepository } from "@/repositories/prisma";
import { AuthenticateUserService } from "@/services/users";

export function makeAuthenticateUserFactory(): AuthenticateUserService {
	const repo = new UsersRepository();

	return new AuthenticateUserService(repo);
}
