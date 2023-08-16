import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    console.log(token);
    if (!token) next(createError(404, "Please send token"));

    jwt.verify(token, process.env.JWT, function (err, user) {
      if (err) next(createError(401, "Please send valid token."));
      req.user = user;
      next();
    });
  } catch (err) {
    next(createError(500, "Erro verifying token."));
  }
};
