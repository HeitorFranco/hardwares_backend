import { User } from "@prisma/client";
import { object, SchemaOf, string } from "yup";

type IUser = Omit<User, "id">;

export const userSchema: SchemaOf<IUser> = object().shape({
  name: string().required(),
  email: string().required().email(),
  password: string().required().min(4),
  cpf: string()
    .required()
    .matches(/\d{3}\.\d{3}\.\d{3}\-\d{2}/g),
  address: string().required(),
});
