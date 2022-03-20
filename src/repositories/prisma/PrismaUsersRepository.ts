import { prisma } from "../../database/client";
import { User } from "../../entities/User";
import { IUsersRepository } from "../interfaces/IUsersRepositories";

class PrismaUsersRepository implements IUsersRepository {
  async exists(email: string): Promise<boolean> {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return !!user;
  }

  async create({ name, email, password, cpf }: User): Promise<User> {
    const user = await prisma.user.create({
      data: { name, email, password, cpf },
    });

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await prisma.user.findFirst({
      where: { id },
    });
    return user ?? undefined;
  }
}

export { PrismaUsersRepository };
