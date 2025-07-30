import type { email, uuid } from "@/dtos";
import { UsersRepositoryBase } from "../users-repository.base";
import type { CreateUserDTO } from "@/dtos/users";
import { prisma } from "@/utils";
import type { GetUserDTO } from "@/dtos/users/get-user.dto";

export class UsersRepository extends UsersRepositoryBase {
	async create(data: CreateUserDTO): Promise<uuid> {
		const newUser = await prisma.user.create({ data });

		return newUser.id;
	}

	async getDataById(id: uuid): Promise<GetUserDTO | null> {
		const targetUser = await prisma.user.findUnique({ where: { id } });

		return targetUser;
	}

	async getPasswordByEmail(email: email): Promise<string | null> {
		const targetUser = await prisma.user.findUnique({ where: { email } });

		if (!targetUser) return null;

		return targetUser.password;
	}
}
