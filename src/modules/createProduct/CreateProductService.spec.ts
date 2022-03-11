import { ProductsRepositoryInMemory } from "../../repositories/in-memory/ProductsRepositoryInMemory";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { IProductsRepository } from "../../repositories/interfaces/IProductsRepositories";
import { IUsersRepository } from "../../repositories/interfaces/IUsersRepositories";
import { generateProductData } from "../../utils/tests/generateProductData";
import { generateUserData } from "../../utils/tests/generateUserData";
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
    const sellerData = generateUserData();
    const { user: seller } = await createUserService.execute(sellerData);
    const productData = generateProductData(seller.id!);

    const product = await createProductService.execute(productData);

    expect(product).toHaveProperty("id");
  });
  it("should not be able create product", async () => {
    const sellerData = generateUserData();
    const { user: seller } = await createUserService.execute(sellerData);
    const productData = generateProductData(seller.id!);

    const product = await createProductService.execute(productData);

    expect(product).toHaveProperty("id");
  });
  it("should not be able to create product with a non-existing seller", async () => {
    const productData = generateProductData("id_non_existent");

    await expect(createProductService.execute(productData)).rejects.toEqual(
      new Error("The seller does not exists!")
    );
  });
});
