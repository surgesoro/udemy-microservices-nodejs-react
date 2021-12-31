import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";

declare global {
  var getAuthCookie: () => Promise<string[]>;
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

global.getAuthCookie = async () => {
  const testEmail = "johnsnow@test.com";
  const testPassword = "password";

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: testEmail,
      password: testPassword,
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie;
};
