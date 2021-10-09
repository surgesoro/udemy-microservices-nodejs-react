import express from "express";

const router = express.Router(); //different from const app = express();
router.post("/api/users/signout", (req, res) => {
  res.send("Hi there!");
});

export { router as signoutRouter };
