import { PrismaProductsRepository } from "../../repositories/prisma/PrismaProductsRepository";
import { GetProductByIdController } from "./GetProductByIdController";
import { GetProductByIdService } from "./GetProductByIdService";

export const GetProductsByIdFactory = () => {
  const productRepository = new PrismaProductsRepository();
  const getProductsById = new GetProductByIdService(productRepository);
  const getProductsByIdController = new GetProductByIdController(
    getProductsById
  );

  return getProductsByIdController;
};
