import request from "supertest";
import { app } from "../../app";
import { Product } from "../../entities/Product";

describe("Get Product By Id Controller", () => {
  it("should be able get a product by id", async () => {
    const productData = Product.mock.omit("id").one();
    const { body: product } = await request(app)
      .post(`/products/`)
      .send(productData);
    const response = await request(app).get(`/products/${product.id}`);

    expect(response.status).toBe(200);
  });
});
