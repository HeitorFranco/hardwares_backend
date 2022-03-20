import { Prisma } from "@prisma/client";
import { productSchema } from "../../entities/Product/schema";
import { AppError } from "../../errors/AppError";
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
    await productSchema.validate(productDetails);

    const sellerAlreadyExists = await this.usersRepository.findById(
      productDetails.seller_id
    );

    if (!sellerAlreadyExists) {
      throw new AppError("The seller does not exists!", 400);
    }

    const productAlreadyExists = await this.productsRepository.exists(
      productDetails.title,
      productDetails.seller_id
    );

    if (productAlreadyExists) {
      throw new AppError("Product already exists!", 400);
    }

    const product = await this.productsRepository.create(productDetails);

    return product;
  }
}

export { CreateProductService };
