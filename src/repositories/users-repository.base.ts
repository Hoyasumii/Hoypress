import type { email, uuid } from "@/dtos";
import type { CreateUserDTO } from "@/dtos/users";
import type { GetUserDTO } from "@/dtos/users/get-user.dto";
import { RepositoryBase } from "./repository-base";

export abstract class UsersRepositoryBase extends RepositoryBase {
	abstract create(data: CreateUserDTO): Promise<uuid>;
	abstract getPasswordByEmail(email: email): Promise<string | null>;
	abstract getDataById(id: uuid): Promise<GetUserDTO | null>;
	abstract getIdByEmail(email: email): Promise<string | null>;
}
