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
