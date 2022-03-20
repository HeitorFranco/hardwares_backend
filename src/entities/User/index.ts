import { User as IUser } from "@prisma/client";
import { Mock, MockFactory } from "mockingbird";

export class User implements IUser {
  static mock = MockFactory(User);

  @Mock((faker) => faker.datatype.uuid())
  id: string;
  @Mock((faker) => faker.name.firstName())
  name: string;
  @Mock((faker) => faker.internet.email())
  email: string;
  @Mock((faker) => faker.internet.password())
  password: string;
  @Mock((faker) => faker.phone.phoneNumber("###.###.###-##"))
  cpf: string;

  constructor(user: User) {
    return Object.assign(this, user);
  }
}
