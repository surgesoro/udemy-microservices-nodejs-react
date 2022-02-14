import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "@gcpticketing/common";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/singup";

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

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
}); //can also be implemented with parameter "next" and using next() instead of throw
// in this case it is implemented with express-async-errors, which is a small package to augment express' async behavior with error throwing

app.use(errorHandler);

export { app };
