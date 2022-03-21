import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/interfaces/IUsersRepositories";

type IUserWithoutPassword = Omit<User, "password"> & {
  password?: string | undefined;
};

export class GetUserByIdService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(userId: string) {
    const user: IUserWithoutPassword | undefined =
      await this.usersRepository.findById(userId);

    delete user?.password;

    return user;
  }
}
