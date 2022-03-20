import { Product as IProduct } from "@prisma/client";
import { Mock, MockFactory } from "mockingbird";

export class Product implements IProduct {
  static mock = MockFactory(Product);

  @Mock((faker) => faker.datatype.uuid())
  id: string;

  @Mock((faker) => faker.commerce.productName())
  title: string;

  @Mock((faker) => faker.commerce.price())
  price: string;

  @Mock((faker) => faker.commerce.productDescription())
  description: string;

  @Mock((faker) => faker.commerce.productMaterial())
  brand: string;

  @Mock((faker) => faker.commerce.department())
  type: string;

  @Mock({ type: String, count: 3 })
  images: Array<string>;

  seller_id: string;

  constructor(product: Product) {
    return Object.assign(this, product);
  }
}
