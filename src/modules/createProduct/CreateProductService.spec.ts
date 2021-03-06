import { v4 as uuid } from "uuid";
import { Product } from "../../entities/Product";
import { User } from "../../entities/User";
import { AppError } from "../../errors/AppError";
import { ProductsRepositoryInMemory } from "../../repositories/in-memory/ProductsRepositoryInMemory";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { IProductsRepository } from "../../repositories/interfaces/IProductsRepositories";
import { IUsersRepository } from "../../repositories/interfaces/IUsersRepositories";
import { CreateUserService } from "../createUser/CreateUserService";
import { CreateProductService } from "./CreateProductService";

describe("Create Product Service", () => {
  let productsRepository: IProductsRepository;
  let usersRepository: IUsersRepository;

  let createProductService: CreateProductService;
  let createUserService: CreateUserService;

  beforeAll(() => {
    productsRepository = new ProductsRepositoryInMemory();
    usersRepository = new UsersRepositoryInMemory();

    createProductService = new CreateProductService(
      productsRepository,
      usersRepository
    );
    createUserService = new CreateUserService(usersRepository);
  });
  it("should be able create product", async () => {
    const sellerData = User.mock.omit("id").one();
    const { user: seller } = await createUserService.execute(sellerData);

    const productData = {
      ...Product.mock.omit("id").one(),
      seller_id: seller.id,
    };

    const product = await createProductService.execute(productData);

    expect(product).toHaveProperty("id");
  });
  it("should not be able create product", async () => {
    const sellerData = User.mock.omit("id").one();
    const { user: seller } = await createUserService.execute(sellerData);
    const productData = {
      ...Product.mock.omit("id").one(),
      seller_id: seller.id,
    };

    const product = await createProductService.execute(productData);

    expect(product).toHaveProperty("id");
  });
  it("should not be able to create product with a non-existing seller_id", async () => {
    const productData = {
      ...Product.mock.omit("id").one(),
      seller_id: uuid(),
    };

    await expect(createProductService.execute(productData)).rejects.toEqual(
      new AppError("The seller does not exists!")
    );
  });
});
