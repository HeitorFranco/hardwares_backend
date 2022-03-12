import { Request, Response } from "express";
import { GetProductByIdService } from "./GetProductByIdService";

class GetProductByIdController {
  constructor(private getProductById: GetProductByIdService) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const product = await this.getProductById.execute(id);

    response.status(200).json(product);
  }
}

export { GetProductByIdController };
