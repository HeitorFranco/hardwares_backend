import { Router } from "express";
import { CreateProductFactory } from "../modules/createProduct/CreateProductFactory";
import { createUserFactory } from "../modules/createUser/CreateUserFactory";
import { GetProductsByIdFactory } from "../modules/getProductById/GetProductByIdFactory";
import { GetProductsFactory } from "../modules/getProducts/GetProductsFactory";

const routes = Router();

//* Users

routes.post("/users", (request, response) =>
  createUserFactory().handle(request, response)
);
//* Products

routes.get("/products", (request, response) =>
  GetProductsFactory().handle(request, response)
);

routes.get("/products/:id", (request, response) =>
  GetProductsByIdFactory().handle(request, response)
);

routes.post("/products", (request, response) =>
  CreateProductFactory().handle(request, response)
);

export { routes };
