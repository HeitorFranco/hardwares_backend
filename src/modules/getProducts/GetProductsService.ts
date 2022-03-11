import { IProductsRepository } from "../../repositories/interfaces/IProductsRepositories";

class GetProductsService {
  constructor(private productsRepository: IProductsRepository) {}

  async execute() {
    const products = await this.productsRepository.findAll();

    return products;
  }
}

export { GetProductsService };
