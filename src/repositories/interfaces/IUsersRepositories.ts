import { User } from "../../entities/User";

interface IUsersRepository {
  create(user: User): Promise<User>;
  exists(email: string): Promise<boolean>;
  findById(id: string): Promise<User | undefined>;
}

export { IUsersRepository };
