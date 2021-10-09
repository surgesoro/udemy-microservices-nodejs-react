import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator"; //there are multiple ways to use express-validator module,
//this one is explicitly validate the {body} of the response
//and {validatorResults}
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

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
  (req: Request, res: Response) => {
    //annotating req and res with types Request and Response
    const errors = validationResult(req);

    //plain JS
    /*
    if (!errors.isEmpty()) {
      const error =  new Error("Invalid email or password");
      error.reasons = error.array();
      throw error;
    }

    console.log("Creating a user...");
    throw new Error("Error connecting to database");
    */

    //TS way - we want an object like and 'Error', but we want to add in some more custom properties to it.
    //Usually a sign you want to subclass something!
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    console.log("Creating a new user...");
    throw new DatabaseConnectionError();
  }
);

export { router as signupRouter };
