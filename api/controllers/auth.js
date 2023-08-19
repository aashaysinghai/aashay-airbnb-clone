import User from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../errors/error.js";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
      role: "USER",
    });

    await newUser.save();
    // return a user in response.
    res.status(200).json("User has been ceated.");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    // find by email and make email as unique.
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token)
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

export const profile = async (req, res) => {
  const { access_token } = req.cookies;
  if (access_token) {
    jwt.verify(access_token, process.env.JWT, {}, async (err, user) => {
      if (err) throw err;
      const { username, email, _id } = await User.findById(user.id);
      res.json({ username, email, _id });
    });
  } else {
    res.json(null);
  }
};

export const logout = async (req, res) => {
  res.cookie("access_token", "").json(true);
};

export const verify = async (req, res, next) => {};
