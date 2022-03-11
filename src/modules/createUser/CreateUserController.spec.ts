/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";
import { app } from "../../app";
import { generateUserData } from "../../utils/tests/generateUserData";

describe("Create User Controller", () => {
  it("Should be able to create a new user", async () => {
    const userData = generateUserData();

    const response = await request(app).post("/users").send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("id");
  });

  it("Should not be able to create an existing user", async () => {
    const userData = generateUserData();
    await request(app).post("/users").send(userData);

    const response = await request(app).post("/users").send(userData);

    expect(response.status).toBe(400);
  });
});
