const { v4: uuid } = require("uuid");
const { execSync } = require("child_process");
const { Client } = require("pg");

const prismaCli = "./node_modules/.bin/prisma";

export default async function () {
  // const schema = process.env.DATABASE_URL?.split("?schema=")[1];
  // const client = new Client({
  //   connectionString: process.env.DATABASE_URL,
  // });
  // await client.connect();
  // await client.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
  // await client.end();
}
