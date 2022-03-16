import { Prisma } from "@prisma/client";
import { IProductsRepository } from "../../repositories/interfaces/IProductsRepositories";
import { IUsersRepository } from "../../repositories/interfaces/IUsersRepositories";

type IProductRequest = Prisma.XOR<
  Prisma.ProductCreateInput,
  Prisma.ProductUncheckedCreateInput
> & {
  seller_id: string;
};

class CreateProductService {
  constructor(
    private productsRepository: IProductsRepository,
    private usersRepository: IUsersRepository
  ) {}
  async execute(productDetails: IProductRequest) {
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

    const product = await this.productsRepository.create(productDetails);

    return product;
  }
}

export { CreateProductService };
