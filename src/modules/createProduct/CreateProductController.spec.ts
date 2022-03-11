/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";
import { app } from "../../app";
import { generateProductData } from "../../utils/tests/generateProductData";
import { generateUserData } from "../../utils/tests/generateUserData";

describe("Create Product Controller", () => {
  it("should be able create a new product", async () => {
    const sellerData = generateUserData();
    const {
      body: { user: seller },
    } = await request(app).post("/users").send(sellerData);
    const productData = generateProductData(seller.id!);

    const response = await request(app).post("/products").send(productData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("should not be able create an existing product", async () => {
    const sellerData = generateUserData();
    const productData = generateProductData(sellerData.id!);
    await request(app).post("/products").send(productData);

    const response = await request(app).post("/products").send(productData);

    expect(response.status).toBe(400);
  });
});
