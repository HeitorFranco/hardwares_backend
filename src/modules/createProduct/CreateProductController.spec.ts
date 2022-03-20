import request from "supertest";
import { app } from "../../app";
import { Product } from "../../entities/Product";
import { User } from "../../entities/User";

describe("Create Product Controller", () => {
  it("should be able create a new product", async () => {
    const sellerData = User.mock.omit("id").one();
    const {
      body: { user: seller },
    } = await request(app).post("/users").send(sellerData);
    const productData = {
      ...Product.mock.omit("id").one(),
      seller_id: seller.id,
    };

    const response = await request(app).post("/products").send(productData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("should not be able create an existing product", async () => {
    const sellerId = User.mock.one().id;
    const productData = {
      ...Product.mock.omit("id").one(),
      seller_id: sellerId,
    };

    await request(app).post("/products").send(productData);

    const response = await request(app).post("/products").send(productData);

    expect(response.status).toBe(400);
  });
});
