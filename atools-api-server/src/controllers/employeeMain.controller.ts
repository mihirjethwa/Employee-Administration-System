import { ApiResponse } from "../models/ApiResponse";
import { Request, Response } from "express";
import EmployeeGD from "../models/EmployeeGeneral";
import EmployeeStore from "../models/EmployeeStore";
import {} from "../helpers/mastersValidationSchema";
import { createEmploeeGeneral } from "../services/employeeGeneral.service";
import { registerSchema } from "../helpers/validationSchema";
import { employeeRegister } from "./auth.controller";
import { AuthService } from "../services/auth.service";
import RoleMaster from "../models/RoleMaster";
import Employee from "../models/Employee";

export const getEmployeeDetailsById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const response = new ApiResponse();
    try {
      const { id } = req.params;
  
      const findEmployee = await Employee.findById(id);
      if (!findEmployee) {
        response.status = { code: 400, message: "Employee not found!" };
        res.status(400).send(response);
        return;
      }
      response.data = findEmployee;
      res.status(200).send(response);
    } catch (error) {
      if (error.isJoi) {
        response.status = { code: 422, message: error.message };
        res.status(422).send(response);
        return;
      }
  
      response.status = { code: 500, message: "Server Error" };
      res.status(500).send(response);
    }
  };