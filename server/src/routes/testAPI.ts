import { Router } from "express";
const testAPIrouter = Router();
testAPIrouter.get("/", (req, res, next) => {
  res.send("api is working");
});

export { testAPIrouter };
