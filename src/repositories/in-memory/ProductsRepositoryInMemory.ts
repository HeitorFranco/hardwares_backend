import { v4 as uuid } from "uuid";
import { Product } from "../../entities/Product";
import { IProductsRepository } from "../interfaces/IProductsRepositories";

class ProductsRepositoryInMemory implements IProductsRepository {
  private products: Product[] = [];

  async exists(title: string, seller_id: string): Promise<boolean> {
    const product = this.products.some(
      (product) => product.title === title && product.seller_id === seller_id
    );
    return product;
  }

  async create(product: Product): Promise<Product> {
    Object.assign(product, {
      id: uuid(),
    });

    this.products.push(product);
    return product;
  }

  async findById(id: string) {
    const product = this.products.find((product) => product.id === id);

    return product;
  }

  async findAll(): Promise<Product[]> {
    return this.products;
  }
}

export { ProductsRepositoryInMemory };
