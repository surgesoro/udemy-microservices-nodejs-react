import request from "supertest";
import { app } from "../../app";

//for later, figure how to pass variable to a const
const createTicket = (title: string, price: number) => {
  return request(app).post("/api/tickets").set("Cookie", global.signin()).send({
    title: title,
    price: price,
  });
};

it("can fetch a list of tickets", async () => {
  //create 3 tickets for testing
  await createTicket("Lady Gaga", 99.99);
  //console.log(response.body);
  await createTicket("Elton John", 89.89);
  //console.log(response2.body);
  await createTicket("Dua Lipa", 79.79);
  //console.log(response3.body);

  const response = await request(app).get("/api/tickets").send().expect(200);

  expect(response.body.length).toEqual(3);
});
