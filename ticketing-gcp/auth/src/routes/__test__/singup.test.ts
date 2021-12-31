import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "johnsnow@test.com",
      password: "password123",
    })
    .expect(201);
});

it("returns a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "invalidemail",
      password: "password123",
    })
    .expect(400);
});

it("returns a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "johnsnow@test.com",
      password: "p",
    })
    .expect(400);
});

it("returns a 400 with missing email AND password", async () => {
  return request(app).post("/api/users/signup").send({}).expect(400);
});

it("returns a 400 with missing email OR password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "johnsnow@test.com",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      password: "password123",
    })
    .expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "johnsnow@test.com",
      password: "password123",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "johnsnow@test.com",
      password: "password123",
    })
    .expect(400);
});

//the following test will fail because "secure: true" is set in app.ts, which means that
//cookie will be set only when request is made ove https
//since supertest is running locally the request in made ove http
//to resolve this, changed to "source: process.env.NODE_ENV !== "test""
it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "johnsnow@test.com",
      password: "password123",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
