const { hash } = require("bcryptjs");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, "../.env.local"),
});

async function seedAdminUser() {
  const email = "info@ijwihub.com";
  const password = "Cinema9834!";
  const hashedPassword = await hash(password, 10);

  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB;
  if (!uri || !dbName) throw new Error("Missing MongoDB credentials");
  const client = new MongoClient(uri, { tlsAllowInvalidCertificates: true });
  await client.connect();
  const db = client.db(dbName);
  await db.collection("Users").deleteMany({ email });
  await db.collection("Users").insertOne({ email, password: hashedPassword });
  console.log("Seeded admin user:", email);
  await client.close();
}

seedAdminUser().then(() => process.exit(0));
