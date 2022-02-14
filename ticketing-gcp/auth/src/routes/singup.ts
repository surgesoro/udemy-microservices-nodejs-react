import express, { Request, Response } from "express";
import { body } from "express-validator"; //there are multiple ways to use express-validator module,
//this one is explicitly validate the {body} of the response
//and {validatorResults}
import jwt from "jsonwebtoken";
import { validateRequest, BadRequestError } from "@gcpticketing/common";

import { User } from "../models/user";

const router = express.Router(); //different from const app = express();
router.post(
  "/api/users/signup",
  //parsing req for validationResult
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use, please use different email");
    }

    const user = User.build({ email, password });
    await user.save();

    //Generate JWT
    // if (!process.env.JWT_KEY){
    //   throw new Error("lkjsflkdjf")
    // }//trick on how to make TS think that JWT_KEY is not undefined,
    //hence has to be string, but this is not the best place for this check. Moved to index.ts
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY! //the "!" mark makes TS to trust that user checked and would like to proceed without knowing the type
    );

    //Store it on session object
    //req.session.jwt = userJwt;//does not work with TS
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
