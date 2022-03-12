import { Product } from "../../entities/Product";
import { ProductsRepositoryInMemory } from "../../repositories/in-memory/ProductsRepositoryInMemory";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { IProductsRepository } from "../../repositories/interfaces/IProductsRepositories";
import { IUsersRepository } from "../../repositories/interfaces/IUsersRepositories";
import { generate } from "../../utils/generate";
import { generateUserData } from "../../utils/tests/generateUserData";
import { CreateProductService } from "../createProduct/CreateProductService";
import { CreateUserService } from "../createUser/CreateUserService";
import { GetProductByIdService } from "./GetProductByIdService";

describe("Get Product By Id Service", () => {
  let productsRepository: IProductsRepository;
  let usersRepository: IUsersRepository;

  let getProductByIdService: GetProductByIdService;
  let createProductService: CreateProductService;
  let createUserService: CreateUserService;

  beforeAll(() => {
    productsRepository = new ProductsRepositoryInMemory();
    usersRepository = new UsersRepositoryInMemory();

    getProductByIdService = new GetProductByIdService(productsRepository);
    createProductService = new CreateProductService(
      productsRepository,
      usersRepository
    );
    createUserService = new CreateUserService(usersRepository);
  });
  it("should be able find product by id", async () => {
    const sellerData = generateUserData();

    const { user: seller } = await createUserService.execute(sellerData);

    const productData: Product = {
      title: generate(),
      price: 1000,
      location: generate(),
      description: generate(),
      brand: generate(),
      type: generate(),
      images: [generate()],
      seller_id: seller.id!,
    };

    const { id: productId } = await createProductService.execute(productData);

    const product = await getProductByIdService.execute(productId!);

    expect(product).not.toBe(undefined);
  });
  it("should return undefined when product.id not exists", async () => {
    const product = await getProductByIdService.execute("not-existis-id");

    expect(product).toBe(undefined);
  });
});
