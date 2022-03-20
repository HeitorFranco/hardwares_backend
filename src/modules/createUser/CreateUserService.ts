import { Prisma } from "@prisma/client";
import jwt from "jsonwebtoken";
import { User } from "../../entities/User";
import { userSchema } from "../../entities/User/schema";
import { IUsersRepository } from "../../repositories/interfaces/IUsersRepositories";

type IUserRequest = Prisma.XOR<
  Prisma.UserCreateInput,
  Prisma.UserUncheckedCreateInput
>;

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
  }: IUserRequest): Promise<IUserResponse> {
    await userSchema.validate({
      name,
      email,
      password,
      cpf,
    });

    const userAlreadyExists = await this.usersRepository.exists(email);

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password,
      cpf,
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "30d",
    });

    return { user, token };
  }
}

export { CreateUserService };
