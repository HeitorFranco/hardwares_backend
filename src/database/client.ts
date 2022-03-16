import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  if (params.model === "User" && params.action === "create") {
    const hashedPassword = await hash(params.args.data.password, 10);
    params.args.data.password = hashedPassword;
  }
  const result = await next(params);

  return result;
});

export { prisma };
