import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../models/ApiResponse";

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  const response = new ApiResponse();
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
