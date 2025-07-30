import type { uuid } from "@/dtos";
import { UsersRepositoryBase } from "../users-repository.interface";
import { CreateUserDTO } from "@/dtos/users";
import { BadRequestError } from "@/errors";

export class UsersRepository extends UsersRepositoryBase {
  async create(data: CreateUserDTO): Promise<uuid> {
      const {success} = CreateUserDTO.safeParse(data);

      throw this.errors.BadRequestError();


  }
}

await new UsersRepository().create({ email: "alanreisanjo@gmail", password: "12131nkjfsabkdjab" })