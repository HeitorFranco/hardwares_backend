class Product {
  id?: string;
  title: string;
  price: number;
  location: string;
  description: string;
  brand: string;
  type: string;
  images: Array<string>;
  seller_id: string;

  private constructor(product: Product) {
    return Object.assign(this, product);
  }

  static create(product: Product) {
    const user = new Product(product);
    return user;
  }
}

export { Product };
