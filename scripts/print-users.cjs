const { MongoClient } = require("mongodb");
require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env.local"),
});

async function main() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB;
  if (!uri || !dbName) throw new Error("Missing MongoDB credentials");
  const client = new MongoClient(uri, { tlsAllowInvalidCertificates: true });
  await client.connect();
  const db = client.db(dbName);
  const users = await db.collection("Users").find({}).toArray();
  console.log("Users in collection:");
  users.forEach((u) => {
    console.log({ email: u.email, password: u.password });
  });
  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
