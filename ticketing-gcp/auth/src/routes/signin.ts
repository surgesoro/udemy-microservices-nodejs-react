import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, BadRequestError } from "@gcpticketing/common";

import { Password } from "../services/password"; //should be something like PasswordManager
import { User } from "../models/user";

const router = express.Router(); //different from const app = express();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      //isLength({ min: 4, max: 20 }) //we do not need this check what is our Sign Up rule changes over time...
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError("Invalid Credentials");
    }

    //Generate JWT
    // if (!process.env.JWT_KEY){
    //   throw new Error("lkjsflkdjf")
    // }//trick on how to make TS think that JWT_KEY is not undefined,
    //hence has to be string, but this is not the best place for this check. Moved to index.ts
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY! //the "!" mark makes TS to trust that user checked and would like to proceed without knowing the type
    );

    //Store it on session object
    //req.session.jwt = userJwt;//does not work with TS
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
