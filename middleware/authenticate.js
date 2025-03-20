import * as jwt from "../utils/jwt.js";

export default async function authenticate(req, _, next) {
  const token = req.cookies.jwt;
  const user = await jwt.getUser(token);
  console.log(user);

  if (!user) {
    throw new Error("User authentication failed!");
  }

  req.user = user;

  next();
}
