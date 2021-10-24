import express from "express";

const router = express.Router(); //different from const app = express();
router.post("/api/users/signout", (req, res) => {
  req.session = null;
  res.send({});
});

export { router as signoutRouter };
