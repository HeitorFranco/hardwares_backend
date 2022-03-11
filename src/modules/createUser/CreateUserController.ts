import { Request, Response } from "express";
import { User } from "../../entities/User";
import { CreateUserService } from "./CreateUserService";

class CreateUserController {
  constructor(private createUser: CreateUserService) {}

  async handle(request: Request, response: Response) {
    const { name, email, password, cpf, address } = request.body as User;

    const { user, token } = await this.createUser.execute({
      name,
      email,
      password,
      cpf,
      address,
    });

    return response.status(201).json({ user, token });
  }
}

export { CreateUserController };
