import { UsersRepository } from "@/repositories/prisma";
import { CreateUserService } from "@/services/users";

export function makeCreateUserFactory(): CreateUserService {
	const repo = new UsersRepository();

	return new CreateUserService(repo);
}
