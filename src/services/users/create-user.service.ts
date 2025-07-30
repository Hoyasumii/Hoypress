import type { uuid } from "@/dtos";
import { CreateUserDTO } from "@/dtos/users";
import type { UsersRepositoryBase } from "@/repositories";
import { hash, genSalt } from "bcryptjs";

export class CreateUserService {
	constructor(private repository: UsersRepositoryBase) {}

	async run(data: CreateUserDTO): Promise<uuid> {
		const { success } = CreateUserDTO.safeParse(data);

		if (!success) throw this.repository.errors.BadRequestError();

		const hashedPasswordSalt = await genSalt();
		const hashedPassword = await hash(data.password, hashedPasswordSalt);

		try {
			const newUserUUID = await this.repository.create({
				...data,
				password: hashedPassword,
			});

			return newUserUUID;
		} catch (_) {
			throw this.repository.errors.ExistentUserError();
		}
	}
}
