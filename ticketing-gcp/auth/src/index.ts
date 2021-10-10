import express from "express";
import "express-async-errors";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/singup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import { getEffectiveTypeParameterDeclarations } from "typescript";

const app = express();
app.use(express.json());
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
}); //can also be implemented with parameter "next" and using next() instead of throw
// in this case it is implemented with express-async-errors, which is a small package to augment express' async behavior with error throwing

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Listening on port 3000!");
});
