import { IUsersRepository } from "../../repositories/interfaces/IUsersRepositories";

export class GetUserByIdService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(userId: string) {
    const user = await this.usersRepository.findById(userId);

    return user;
  }
}
