import * as jwt from "../utils/jwt.js";
import asyncHandler from "./async-handler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  const user = await jwt.getUser(token);

  if (!user) {
    res.status(400);
    throw new Error("User authentication failed!");
  }

  req.user = user;

  next();
});

export default authenticate;
