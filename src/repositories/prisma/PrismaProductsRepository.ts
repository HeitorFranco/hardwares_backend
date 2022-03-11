import { prisma } from "../../database/client";
import { Product } from "../../entities/Product";
import { IProductsRepository } from "../interfaces/IProductsRepositories";

class PrismaProductsRepository implements IProductsRepository {
  async exists(title: string, seller_id: string): Promise<boolean> {
    const product = await prisma.product.findFirst({
      where: {
        title,
        seller_id,
      },
    });

    return !!product;
  }

  async create(productData: Product): Promise<Product> {
    const product = await prisma.product.create({
      data: { ...productData, id: undefined },
    });

    return product;
  }

  async findById(id: string): Promise<Product | undefined> {
    const product = await prisma.product.findFirst({
      where: { id },
    });
    return product ?? undefined;
  }

  async findAll(): Promise<Product[]> {
    const products = await prisma.product.findMany();

    return products;
  }
}

export { PrismaProductsRepository };
