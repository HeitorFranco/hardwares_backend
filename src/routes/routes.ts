import { Router } from "express";
import { createUserFactory } from "../modules/createUser/CreateUserFactory";

const routes = Router();

//* Users

routes.post("/users", (request, response) =>
  createUserFactory().handle(request, response)
);

export { routes };
