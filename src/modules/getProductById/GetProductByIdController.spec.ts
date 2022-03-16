import request from "supertest";
import { app } from "../../app";
import { Product } from "../../entities/Product";
import { User } from "../../entities/User";

describe("Get Product By Id Controller", () => {
  it("should be able get a product by id", async () => {
    const sellerData = User.mock.omit("id").one();

    const { body: seller } = await request(app)
      .post(`/users/`)
      .send(sellerData);

    const productData = {
      ...Product.mock.omit("id").one(),
      seller_id: seller.user.id,
    };
    const { body: product } = await request(app)
      .post(`/products/`)
      .send(productData);

    const response = await request(app).get(`/products/${product.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("seller_id");
  });
});
