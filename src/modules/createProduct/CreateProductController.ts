import { Request, Response } from "express";
import { Product } from "../../entities/Product";
import { CreateProductService } from "./CreateProductService";

class CreateProductController {
  constructor(private createProduct: CreateProductService) {}

  async handle(request: Request, response: Response) {
    const {
      title,
      price,
      location,
      description,
      brand,
      type,
      images,
      seller_id,
    } = request.body as Product;

    const product = await this.createProduct.execute({
      title,
      price,
      location,
      description,
      brand,
      type,
      images,
      seller_id,
    });

    return response.status(201).json(product);
  }
}

export { CreateProductController };
