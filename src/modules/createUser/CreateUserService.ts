import "dotenv/config";
import jwt from "jsonwebtoken";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/interfaces/IUsersRepositories";

interface IUserRequest extends User {}

interface IUserResponse {
  user: User;
  token: string;
}

class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
    cpf,
    address,
  }: IUserRequest): Promise<IUserResponse> {
    const userAlreadyExists = await this.usersRepository.exists(email);

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const userCreate = User.create({ name, email, password, cpf, address });
    const user = await this.usersRepository.create(userCreate);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "", {
      expiresIn: "30d",
    });

    return { user, token };
  }
}

export { CreateUserService };
