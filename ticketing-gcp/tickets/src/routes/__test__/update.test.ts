import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("return 404 if the provided ticket id does not exist", async () => {
  //generate fake but valid MangoDb format id
  const fakeId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${fakeId}`)
    .set("Cookie", global.signin())
    .send({
      title: "Test Update",
      price: 11.99,
    })
    .expect(404);
});

it("return 401 if the the user is not authenticated", async () => {
  //generate fake but valid MangoDb format id
  const fakeId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${fakeId}`)
    //.set("Cookie", global.signin()) //excluding authentication
    .send({
      title: "Test Update",
      price: 11.99,
    })
    .expect(401);
});

it("return 401 if the user does not own the ticket", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "Test Ticket",
      price: 11.99,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "Update Test Ticket",
      price: 0.99,
    })
    .expect(401);
});

it("return 400 if the provided invalid title or price", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "Test Ticket",
      price: 11.99,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 20,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "Test Ticket",
      price: -10,
    })
    .expect(400);
});

it("successfully updated ticket based on the valid inputs", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "Test Ticket",
      price: 11.99,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "New Updated Title",
      price: 100,
    })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  expect(ticketResponse.body.title).toEqual("New Updated Title");
  expect(ticketResponse.body.price).toEqual(100);
});
