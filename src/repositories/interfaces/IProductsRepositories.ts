import { Product } from "../../entities/Product";

interface IProductsRepository {
  create(product: Product): Promise<Product>;
  exists(title: string, seller_id: string): Promise<boolean>;
  findById(id: string): Promise<Product | undefined>;
  findAll(): Promise<Product[]>;
}

export { IProductsRepository };
