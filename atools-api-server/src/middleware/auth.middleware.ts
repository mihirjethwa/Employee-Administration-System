import Employee from "../models/Employee";
import AccessMaster from "../models/AccessMaster";

import jwt from "jsonwebtoken";
import { ApiResponse } from "../models/ApiResponse";
import { Request, Response, NextFunction } from "express";
import { JWT } from "../config/api.config";

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const response = new ApiResponse();
  try {
    var authToken;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      authToken = req.headers.authorization.split(" ")[1];
    }

    if (!authToken) {
      response.status = { code: 401, message: "Authorization error!" };
      res.status(401).send(response);
      return;
    }

    try {
      interface Decoded {
        id: String;
        userName: String;
        iat: Date;
        exp: Date;
      }
      const decoded = jwt.verify(authToken, JWT.key) as unknown as Decoded;
      req.body.employee = await Employee.findById(decoded.id);
      next();
    } catch (error) {
      response.status = { code: 401, message: "Token expired!" };
      res.status(401).send(response);
      return;
    }
  } catch (error) {
    response.status = { code: 500, message: "Server error!" };
    res.status(500).send(response);
  }
};

export const authorize = (role: any) => {
  const response = new ApiResponse();

  return async (req: Request, res: Response, next: NextFunction) => {
    console.log(role);
    const access = await AccessMaster.findOne({ role: req.body.employee.role });

    var giveAccess = false;
    access?.modulesAccess.filter((obj: any) => {
      if (obj.name === role && obj.access === true) {
        giveAccess = true;
      }
    });

    if (!giveAccess) {
      response.status = { code: 403, message: "Forbidden error! Your role is not allowed to access this route." };
      res.status(403).send(response);
      return;
    }

    next();
  };
};
