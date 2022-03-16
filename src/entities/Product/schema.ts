import { Product } from "@prisma/client";
import { array, object, SchemaOf, string } from "yup";

type IProduct = Omit<Product, "id">;

export const productSchema: SchemaOf<IProduct> = object().shape({
  title: string().required(),
  price: string().required(),
  location: string().required(),
  description: string().required(),
  brand: string().required(),
  type: string().required(),
  images: array().required(),
  seller_id: string().uuid().required(),
});
