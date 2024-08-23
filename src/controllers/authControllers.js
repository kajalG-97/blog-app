import { User } from "../models/User.js";
import bcryptjs from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

// jwt.sign(payload, secretOrPrivateKey, [options, callback])
const generateToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: "7h" });
};

export const register = async (req, res) => {
  const errors = validationResult(req);

  try {
    let user = await User.findOne({ email: req.body?.email });

    if (user)
      return res.status(400).send("already user exist, try different mail");

    var hash = bcryptjs.hashSync(req.body.password, 8);

    user = await User.create({
      ...req.body,
      password: hash,
    });

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const login = async (req, res) => {
  try {
    // check user exist
    let user = await User.findOne({ email: req.body.email });
    // throw error
    if (!user) res.status(400).send("Please register first");

    // check password correct
    const comparePassword = bcryptjs.compareSync(
      req.body.password,
      user.password
    );
    if (!comparePassword)
      return res.status(400).send("Incorrect password or mail");

    // generate token
    const token = generateToken(user);

    return res.status(200).send({ user, token });
  } catch (error) {
    return res.status(500).send(error);
  }
};
