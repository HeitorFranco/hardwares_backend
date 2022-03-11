/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";
import { app } from "../../app";

describe("Get Products Controller", () => {
  it("Should be able to get a product", async () => {
    const response = await request(app).get("/products");

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });
});
