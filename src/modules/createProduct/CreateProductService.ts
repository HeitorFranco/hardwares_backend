import { Product } from "../../entities/Product";
import { IProductsRepository } from "../../repositories/interfaces/IProductsRepositories";
import { IUsersRepository } from "../../repositories/interfaces/IUsersRepositories";

class CreateProductService {
  constructor(
    private productsRepository: IProductsRepository,
    private usersRepository: IUsersRepository
  ) {}
  async execute(productDetails: Product) {
    const sellerAlreadyExists = await this.usersRepository.findById(
      productDetails.seller_id
    );

    if (!sellerAlreadyExists) {
      throw new Error("The seller does not exists!");
    }

    const productAlreadyExists = await this.productsRepository.exists(
      productDetails.title,
      productDetails.seller_id
    );

    if (productAlreadyExists) {
      throw new Error("Product already exists!");
    }

    const productCreate = Product.create(productDetails);
    const product = await this.productsRepository.create(productCreate);

    return product;
  }
}

export { CreateProductService };
