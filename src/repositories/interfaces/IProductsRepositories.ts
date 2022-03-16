import { Prisma } from "@prisma/client";
import { Product } from "../../entities/Product";

interface IProductsRepository {
  create(
    product: Prisma.XOR<
      Prisma.ProductCreateInput,
      Prisma.ProductUncheckedCreateInput
    >
  ): Promise<Product>;
  exists(title: string, seller_id: string): Promise<boolean>;
  findById(id: string): Promise<Product | undefined>;
  findAll(): Promise<Product[]>;
}

export { IProductsRepository };
