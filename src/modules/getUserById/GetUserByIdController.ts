import { Request, Response } from "express";
import { GetUserByIdService } from "./GetUserByIdService";

export class GetUserByIdController {
  constructor(private getUserById: GetUserByIdService) {}

  async handle(request: Request, response: Response) {
    const user = await this.getUserById.execute(request.user.id);

    return response.json(user);
  }
}
