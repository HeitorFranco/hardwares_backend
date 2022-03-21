import { User } from "../../entities/User";
import { AppError } from "../../errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/interfaces/IUsersRepositories";
import { CreateUserService } from "./CreateUserService";

describe("Create User Service", () => {
  let usersRepository: IUsersRepository;
  let createUserService: CreateUserService;

  beforeAll(() => {
    usersRepository = new UsersRepositoryInMemory();
    createUserService = new CreateUserService(usersRepository);
  });
  it("should be able create user", async () => {
    const userData = User.mock.omit("id").one();

    const response = await createUserService.execute(userData);

    expect(response.user).toHaveProperty("id");
    expect(response.user).not.toHaveProperty("password");
  });
  it("should not be able to create user", async () => {
    const userData = User.mock.omit("id").one();

    await createUserService.execute(userData);

    await expect(createUserService.execute(userData)).rejects.toEqual(
      new AppError("User already exists!")
    );
  });
});
