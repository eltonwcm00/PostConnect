import jwt from "jsonwebtoken";
import Faculty from "../models/Faculty.js";
import Panel from "../models/Panel.js";
import asyncHandler from "express-async-handler";

const protectFaculty = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET); //decodes token id

      req.userFaculty = await Faculty.findById(decoded.id); // req.userFaculty, userFaculty var is assigned once logged in
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const protectPanel = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET); //decodes token id

      req.userPanel = await Panel.findById(decoded.id); // req.userFaculty, userFaculty var is assigned once logged in
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protectFaculty, protectPanel };
