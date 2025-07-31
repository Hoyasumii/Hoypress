import { AuthenticateUserDTO } from "@/dtos/users";
import type { UsersRepositoryBase } from "@/repositories";
import { compare } from "bcryptjs";
import { SignJwtToken } from "@/services/jwt";

export class AuthenticateUserService {
	constructor(private repository: UsersRepositoryBase) {}

	async run(data: AuthenticateUserDTO) {
		const signJwtService = new SignJwtToken();

		const { success } = AuthenticateUserDTO.safeParse(data);

		if (!success) throw this.repository.errors.BadRequestError();

		const { email, password } = data;

		const userId = await this.repository.getIdByEmail(email);

		if (!userId) throw this.repository.errors.BadRequestError();

		const passwordHash = (await this.repository.getPasswordByEmail(
			email,
		)) as string;

		const passwordIsCorrect = await compare(password, passwordHash);

		if (!passwordIsCorrect) throw this.repository.errors.BadRequestError();

		return await signJwtService.run({ userId });
	}
}
