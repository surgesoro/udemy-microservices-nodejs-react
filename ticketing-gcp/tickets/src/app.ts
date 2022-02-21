import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@gcpticketing/common";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes";
import { updateTicketRouter } from "./routes/update";

const app = express();
app.set("trust proxy", true); //traffic is being proxied to our app through ingress-nginx
//by default express will not trust proxy
//adding this to make sure that express is aware that it is behind a proxy
//and to trust traffic to being secure even though it is coming through proxy
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    //secure: true,
    secure: process.env.NODE_ENV !== "test", //if not equal to test, then true, else false
  })
);

app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
}); //can also be implemented with parameter "next" and using next() instead of throw
// in this case it is implemented with express-async-errors, which is a small package to augment express' async behavior with error throwing

app.use(errorHandler);

export { app };
