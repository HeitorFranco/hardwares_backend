import request from "supertest";
import { app } from "../../app";
import { User } from "../../entities/User";

describe("Get User By Id Controller", () => {
  it("should be able get user by id", async () => {
    const userData = User.mock.omit("id").one();

    const { body: newUser } = await request(app).post(`/users/`).send(userData);

    const response = await request(app)
      .get(`/users`)
      .set("Authorization", `Bearer ${newUser.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("id");
  });
  it("should not be able to get the user without token", async () => {
    const userData = User.mock.omit("id").one();

    const { body: newUser } = await request(app).post(`/users/`).send(userData);

    const response = await request(app).get(`/users`);

    expect(response.body.message).toBe("JWT token is missing!");
    expect(response.status).toBe(401);
  });
});
