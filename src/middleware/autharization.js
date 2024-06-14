import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET);
};

export const authorizationMiddleware = async (req, res, next) => {
  // check token exist
  // verify token
  // verify user is exist or not
  // if all case pass then next

  try {
    if (!req.headers.authorization)
      return res.status(404).send("invalid token");

    const token = req.headers.authorization?.split(" ")?.[1];

    if (!token) {
      return res.status(401).send("Invalid token format");
    }
    const data = verifyToken(token);

    if (!data.user) return res.status(403).send("token is invalid");

    const user = await User.findOne({ _id: data?.user?._id }); // how to pass this user id in next middleware

    if (!user) res.status(401).send("User not exist");

    req.user = user;

    next();
  } catch (error) {
    return res.status(500).send("token validation failed");
  }
};
