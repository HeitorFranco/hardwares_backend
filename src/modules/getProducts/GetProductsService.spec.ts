import { ProductsRepositoryInMemory } from "../../repositories/in-memory/ProductsRepositoryInMemory";
import { IProductsRepository } from "../../repositories/interfaces/IProductsRepositories";
import { GetProductsService } from "./GetProductsService";

describe("Get Products Service", () => {
  let productsRepository: IProductsRepository;
  let getProductService: GetProductsService;

  beforeAll(() => {
    productsRepository = new ProductsRepositoryInMemory();
    getProductService = new GetProductsService(productsRepository);
  });
  it("should be able find products", async () => {
    const products = await getProductService.execute();

    expect(products).toBeTruthy();
  });
});
