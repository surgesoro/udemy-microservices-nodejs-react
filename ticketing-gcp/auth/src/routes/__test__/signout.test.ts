import request from "supertest";
import { app } from "../../app";

it("clears the cookie after signing out", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "johnsnow@test.com",
      password: "password123",
    })
    .expect(201);

  const resSignin = await request(app)
    .post("/api/users/signin")
    .send({
      email: "johnsnow@test.com",
      password: "password123",
    })
    .expect(200);

  expect(resSignin.get("Set-Cookie")).toBeDefined();
  //console.log(resSignin.get("Set-Cookie"));

  const resSignout = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200);

  expect(resSignout.get("Set-Cookie")[0]).toEqual(
    "express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
  //console.log(resSignout.get("Set-Cookie"));
});
