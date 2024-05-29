import { ApiResponse } from "../models/ApiResponse";
import { Request, Response } from "express";
import Employee from "../models/Employee";
import EmployeeGeneral from "../models/EmployeeGeneral";
import EmployeeSearch from "../models/EmployeeSearch";
import { searchEmployee } from "../services/searchUser.service";

export const getSearchUser = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const escapeRegex = (text: any) => {
      return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };

    const reqQuery = { ...req.query };

    const remove = ["page", "limit", "sort"];

    remove.forEach((value) => delete reqQuery[value]);

    let queryStr = reqQuery;

    const regex = new RegExp(escapeRegex(req.query.query), "gi");

    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 5;
    const skip = (page - 1) * limit;
    const sort = req.query.sort;
    const sortAs = parseInt(req.query.sortAs as string, 10);
    const store = (req.query.store as string) || "";
    const role = (req.query.role as string) || "";
    const empStatus = (req.query.empStatus as string) || "";

    const makeData = await searchEmployee(regex, page, limit, skip, sort, store, role, empStatus);
    // console.log(users);

    response.data = makeData;
    res.status(200).send(response);
  } catch (error) {
    if (error.isJoi) {
      response.status = { code: 422, message: error.message };
      res.status(422).send(response);
      return;
    }
    console.log(error);

    response.status = { code: 500, message: "Server Error" };
    res.status(500).send(response);
  }
};
