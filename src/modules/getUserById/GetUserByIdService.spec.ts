import { User } from "../../entities/User";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/interfaces/IUsersRepositories";
import { CreateUserService } from "../createUser/CreateUserService";
import { GetUserByIdService } from "./GetUserByIdService";

describe("Get User By Id Service", () => {
  let usersRepository: IUsersRepository;
  let createUserService: CreateUserService;
  let getUserByIdService: GetUserByIdService;

  beforeAll(() => {
    usersRepository = new UsersRepositoryInMemory();
    createUserService = new CreateUserService(usersRepository);
    getUserByIdService = new GetUserByIdService(usersRepository);
  });

  it("should be able get User", async () => {
    const userData = User.mock.omit("id").one();
    const newUser = await createUserService.execute(userData);

    const user = await getUserByIdService.execute(newUser.user.id);

    expect(user).toHaveProperty("id");
    expect(user?.id).toBe(newUser.user.id);
    expect(user).not.toHaveProperty("password");
  });
});
