import type { email, uuid } from "@/dtos";
import type { CreateUserDTO } from "@/dtos/users";
import type { GetUserDTO } from "@/dtos/users/get-user.dto";

export interface UsersRepositoryInterface {
	create(data: CreateUserDTO): Promise<uuid>;
	getPasswordByEmail(email: email): Promise<string>;
	getDataById(id: uuid): Promise<GetUserDTO>;
}
