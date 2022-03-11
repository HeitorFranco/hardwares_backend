import { User } from "../../entities/User";
import { generate } from "../generate";

export const generateUserData = (): User => ({
  name: generate(),
  email: generate(),
  password: generate(),
  cpf: "000.000.000-00",
  address: generate(),
});
