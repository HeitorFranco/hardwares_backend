import { User } from "../../entities/User";
import { IUsersRepository } from "../interfaces/IUsersRepositories";
import { v4 as uuid } from "uuid";

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  async exists(email: string): Promise<boolean> {
    const user = this.users.some((user) => user.email === email);
    return user;
  }
  async create(user: User): Promise<User> {
    Object.assign(user, {
      id: uuid(),
    });

    this.users.push(user);
    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.id === id);
    return user;
  }
}

export { UsersRepositoryInMemory };
