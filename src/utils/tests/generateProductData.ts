import { Product } from "../../entities/Product";
import { generate } from "../generate";

export const generateProductData = (seller_id: string): Product => ({
  title: generate(),
  price: Math.floor(Math.random() * 2500),
  location: generate(),
  description: generate(),
  brand: generate(),
  type: generate(),
  images: [generate()],
  seller_id: seller_id,
});
