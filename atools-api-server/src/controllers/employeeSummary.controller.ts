import { ApiResponse } from "../models/ApiResponse";
import { Request, Response } from "express";
import EmployeeStore from "../models/EmployeeStore";
import EmployeeGD from "../models/EmployeeGeneral";
import EmployeePayroll from "../models/EmployeePayroll";
import EmployeeRight from "../models/EmployeeRight";
import EmployeeDocs from "../models/EmployeeDocs";
import EmployeeSummary from "../models/EmployeeSummary";
import { Summary } from "../services/employeeSummary.service";
export const getEmployeeSummary = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    response.data = await EmployeeSummary.find({}).populate("role", { roleName: true });
    res.status(200).send(response);
  } catch (error: any) {
    if (error.isJoi) {
      response.status = { code: 422, message: error.message };
      res.status(422).send(response);
      return;
    }

    response.status = { code: 500, message: "Server Error" };
    res.status(500).send(response);
  }
};

export const getEmployeeSummaryById = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;
    const summary = new Summary();
    const data = await summary.getEmployeeSummary(id);
    console.log("get employee summary data");
    console.log(data);

    // const findEmployeeGd = await EmployeeSummary.find({ employeeId: id })
    //   .populate({
    //     path: "role",
    //     model: "RoleMaster",
    //   })
    //   .populate({
    //     path: "store",
    //     model: "StoreMaster",
    //   });
    // if (!findEmployeeGd) {
    //   response.status = { code: 400, message: "Location not found!" };
    //   res.status(400).send(response);
    //   return;
    // }
    response.data = data;
    res.status(200).send(response);
  } catch (error: any) {
    if (error.isJoi) {
      response.status = { code: 422, message: error.message };
      res.status(422).send(response);
      return;
    }

    response.status = { code: 500, message: "Server Error" };
    res.status(500).send(response);
  }
};
