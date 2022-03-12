import { IProductsRepository } from "../../repositories/interfaces/IProductsRepositories";

class GetProductByIdService {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(productId: string) {
    const product = await this.productsRepository.findById(productId);

    return product;
  }
}

export { GetProductByIdService };
