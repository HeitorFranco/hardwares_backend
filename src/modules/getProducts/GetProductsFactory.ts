import { PrismaProductsRepository } from "../../repositories/prisma/PrismaProductsRepository";
import { GetProductController } from "./GetProductsController";
import { GetProductsService } from "./GetProductsService";

export const GetProductsFactory = () => {
  const productRepository = new PrismaProductsRepository();
  const getProducts = new GetProductsService(productRepository);
  const getProductsController = new GetProductController(getProducts);

  return getProductsController;
};
