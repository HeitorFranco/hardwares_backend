class User {
  id?: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  address: string;

  private constructor(user: User) {
    return Object.assign(this, user);
  }

  static create(user: User) {
    const userCreated = new User(user);
    return userCreated;
  }
}

export { User };
