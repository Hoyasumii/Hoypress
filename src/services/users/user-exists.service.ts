import { uuid } from "@/dtos";
import type { UsersRepositoryBase } from "@/repositories";

export class UserExistsService {
	constructor(private repository: UsersRepositoryBase) {}

	async run(id: uuid): Promise<boolean> {
		const { success } = uuid.safeParse(id);

		if (!success) throw this.repository.errors.BadRequestError();

		return (await this.repository.getDataById(id)) !== null;
	}
}
