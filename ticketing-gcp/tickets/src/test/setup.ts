import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
import jwt from "jsonwebtoken";

declare global {
  var signin: () => string[];
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf"; // just a temporary environment setup for testing purposes

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {
    //as of mongoose v6.0 useNewUrlParser, useUnifiedTopology, and useCreateIndex are true, and useFindAndModify is false
    //useNewUrlParser: true,
    //useUnifiedTopology: true
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
  //Faking Auth during test - all we need is to validate that there is a valid JWT
  // 1. build a JWT payload. { id, email }
  const payload = {
    //id: "1j2jk3j4k5j",
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "johnsnow@test.com",
  };

  // 2. create JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // 3. Build session Object { jwt: MY_JWT }
  const session = { jwt: token };

  // 4. turn this session into JSON
  const sessionJSON = JSON.stringify(session);

  // 5. take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // 6. return a string that the cookie with the encoded data
  // note: to make it work with supertest wrap return into array
  return [`express:sess=${base64}`];
};
