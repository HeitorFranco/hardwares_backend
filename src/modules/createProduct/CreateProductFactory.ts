import { PrismaProductsRepository } from "../../repositories/prisma/PrismaProductsRepository";
import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUsersRepository";
import { CreateProductController } from "./CreateProductController";
import { CreateProductService } from "./CreateProductService";

export const CreateProductFactory = () => {
  const productRepository = new PrismaProductsRepository();
  const usersRepository = new PrismaUsersRepository();
  const createProduct = new CreateProductService(
    productRepository,
    usersRepository
  );
  const createProductController = new CreateProductController(createProduct);

  return createProductController;
};
