import type { AuthenticateUserDTO } from "@/dtos/users";
import type { UsersRepositoryBase } from "@/repositories";

export class AuthenticateUserService {
  constructor(private repository: UsersRepositoryBase) {}

  async run(data: AuthenticateUserDTO) {
    
  }
}