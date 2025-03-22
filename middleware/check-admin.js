import asyncHandler from "./async-handler.js";

const checkAdmin = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    res.status(401);
    throw new Error("User not logged in");
  }
  if (!user.isAdmin) {
    res.status(401);
    throw new Error("User not admin");
  }
  next();
});

export default checkAdmin;
