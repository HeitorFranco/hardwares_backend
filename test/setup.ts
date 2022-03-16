import path from "path";
const { v4: uuid } = require("uuid");
const { execSync } = require("child_process");

const prismaCli = "./node_modules/.bin/prisma";

export default async function () {
  if (process.env.DATABASE_URL?.includes("?schema=")) {
    process.env.DATABASE_URL = process.env.DATABASE_URL?.split("?schema=")[0];
  }
  const dotenv = await import("dotenv");

  dotenv.config({ path: path.resolve(__dirname, "../.env.test") });

  const schema = `code_schema_${uuid()}`;
  const connectionString = `${process.env.DATABASE_URL}?schema=${schema}`;
  process.env.DATABASE_URL = connectionString;

  execSync(`${prismaCli} migrate dev`);
}
