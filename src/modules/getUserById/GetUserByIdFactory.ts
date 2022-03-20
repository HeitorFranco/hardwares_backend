import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUsersRepository";
import { GetUserByIdController } from "./GetUserByIdController";
import { GetUserByIdService } from "./GetUserByIdService";

export const GetUserByIdFactory = () => {
  const usersRepository = new PrismaUsersRepository();
  const getUserById = new GetUserByIdService(usersRepository);
  const getUserByIdController = new GetUserByIdController(getUserById);

  return getUserByIdController;
};
