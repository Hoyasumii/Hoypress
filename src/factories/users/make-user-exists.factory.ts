import { UsersRepository } from "@/repositories/prisma";
import { UserExistsService } from "@/services/users";

export function makeUserExists() {
	const repo = new UsersRepository();

	return new UserExistsService(repo);
}
