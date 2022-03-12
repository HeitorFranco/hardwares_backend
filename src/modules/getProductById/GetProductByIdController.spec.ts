/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";
import { app } from "../../app";
import { generateProductData } from "../../utils/tests/generateProductData";

describe("Get Product By Id Controller", () => {
  it("should be able get a product by id", async () => {
    const productData = generateProductData("");

    const response = await request(app).get(`/products/${productData.id}`);

    expect(response.status).toBe(200);
  });
});
