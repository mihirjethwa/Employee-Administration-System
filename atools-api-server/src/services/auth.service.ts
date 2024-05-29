import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import { JWT } from "../config/api.config";
import Employee, { IEmployee } from "../models/Employee";
import bcrypt from "bcryptjs";
var mongoose = require("mongoose");
export class AuthService {
  tokenVerifyOptions: VerifyOptions;

  constructor() {
    this.tokenVerifyOptions = {
      // algorithms: [Algorithm.HS256],
      ignoreExpiration: false,
    };
  }

  generateAccessToken(): string {
    const accessTokenOptions: SignOptions = {
      // algorithm: Algorithm.HS256,
      audience: JWT.audience,
      issuer: JWT.issuer,
      expiresIn: JWT.accessTokenLife,
    };
    return jwt.sign({ user: "test-user" }, JWT.accessTokenSecretKey, accessTokenOptions);
  }

  generateRefreshToken(): string {
    const refreshTokenOptons: SignOptions = {
      // algorithm: Algorithm.HS256,
      audience: JWT.audience,
      issuer: JWT.issuer,
      expiresIn: JWT.refreshTokenLife,
    };
    return jwt.sign({ user: "test-user" }, JWT.accessTokenSecretKey, refreshTokenOptons);
  }

  verifyAccessToken(token: string): boolean {
    try {
      jwt.verify(token, JWT.accessTokenSecretKey, this.tokenVerifyOptions);
      return true;
    } catch (err) {
      return false;
    }
  }

  verifyRefreshToken(token: string): boolean {
    try {
      jwt.verify(token, JWT.accessTokenSecretKey, this.tokenVerifyOptions);
      return true;
    } catch (err) {
      return false;
    }
  }

  createEmployee = async (data: IEmployee): Promise<IEmployee> => {
    console.log(data);
    const newEmployee = new Employee({
      userName: data.userName,
      email: data.email,
      empStatus: data.empStatus,
      store: data.store,
      // password: data.password,
      role: data.role,
      formCompleted: data.formCompleted,
      pageStatus: data.pageStatus,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
    });

    // const hashedPassword = await bcrypt.hash(newEmployee.password, 10);
    // newEmployee.password = hashedPassword;
    return newEmployee;
  };
}
