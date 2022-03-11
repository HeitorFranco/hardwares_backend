import { Request, Response } from "express";
import { GetProductsService } from "./GetProductsService";

class GetProductController {
  constructor(private getProducts: GetProductsService) {}

  async handle(request: Request, response: Response) {
    const product = await this.getProducts.execute();

    return response.status(200).json(product);
  }
}

export { GetProductController };
