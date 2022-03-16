import { Prisma } from "@prisma/client";
import { User } from "../../entities/User";

interface IUsersRepository {
  create(
    user: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>
  ): Promise<User>;
  exists(email: string): Promise<boolean>;
  findById(id: string): Promise<User | undefined>;
}

export { IUsersRepository };
