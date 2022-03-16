import request from "supertest";
import { app } from "../../app";
import { User } from "../../entities/User";

describe("Create User Controller", () => {
  it("Should be able to create a new user", async () => {
    const userData = User.mock.omit("id").one();

    const response = await request(app).post("/users").send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("id");
  });

  it("Should not be able to create an existing user", async () => {
    const userData = User.mock.omit("id").one();
    await request(app).post("/users").send(userData);

    const response = await request(app).post("/users").send(userData);

    expect(response.status).toBe(400);
  });
});
