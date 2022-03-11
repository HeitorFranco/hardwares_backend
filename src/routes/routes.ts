import { Router } from "express";
import { CreateProductFactory } from "../modules/createProduct/CreateProductFactory";
import { createUserFactory } from "../modules/createUser/CreateUserFactory";

const routes = Router();

//* Users

routes.post("/users", (request, response) =>
  createUserFactory().handle(request, response)
);
//* Products

routes.post("/products", (request, response) =>
  CreateProductFactory().handle(request, response)
);

export { routes };
