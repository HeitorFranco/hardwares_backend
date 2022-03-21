import { User } from "@prisma/client";
import { object, SchemaOf, string } from "yup";

type IUser = Omit<User, "id" | "avatar">;

export const userSchema: SchemaOf<IUser> = object().shape({
  name: string()
    .required("Name is a required field")
    .min(3, "Enter a name more than 3 character")
    .max(
      120,
      "Enter a name of less than 120 characters, abbreviate if necessary"
    ),
  email: string()
    .required("Email is a required field")
    .email("Email must be a valid email"),
  cpf: string()
    .required("CPF is a required field")
    .matches(/^\d{3}.?\d{3}.?\d{3}-?\d{2}$/, "The CPF must be valid"),
  password: string()
    .required("Password is a required field")
    .min(5, "Enter a password more than 5 character"),
});
