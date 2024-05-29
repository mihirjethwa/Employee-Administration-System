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
import { sendMail } from "../util/sendEmail";
import jwt from "jsonwebtoken";
import { JWT } from "../config/api.config";
import { createEmployeeStatus2 } from "../services/employeeStatus.service";
const axios = require("axios");

export const addEmployeeGD = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  const authservice = new AuthService();

  try {
    // const result = await storeMasterSchema.validateAsync(req.body);
    const employee = await Employee.findOne({ email: req.body.email });
    // const result = await registerSchema.validateAsync(req.body);

    if (employee) {
      response.status = {
        code: 400,
        message: "Employee with this email already exist!",
      };
      res.status(400).send(response);
      return;
    }

    const saveRequest = async () => {
      const newEmployee = await authservice.createEmployee({
        ...req.body,
        formCompleted: false,
      });
      const savedEmployee = await newEmployee.save();
      const employeeGD = await createEmploeeGeneral({
        ...req.body,
        employeeId: savedEmployee._id,
      });
      const employeeStatus = await createEmployeeStatus2({
        status: "Current",
        employeeId: savedEmployee._id,
        createdBy: req.body.employee.id,
      });
      const saveStatus = await employeeStatus.save();
      const savedemployeeGD = await employeeGD.save();
      const role = await RoleMaster.findById(req.body.role);
      if (role?.roleName === "Admin" || role?.roleName === "admin") {
        const secret = JWT.key + req.body.email;
        const payload = {
          email: req.body.email,
        };
        const token = jwt.sign(payload, secret, { expiresIn: "1h" });
        const link = `https://localhost:3000/reset-password?e=${req.body.email}&t=${token}`;

        const message = `You are receiving this email because you are registered as admin. \n\n ${link}`;

        try {
          await sendMail({
            email: req.body.email,
            subject: "Password set",
            message,
          });
        } catch (error) {
          response.status = { code: 500, message: "Email could not be sent" };
          res.status(500).send(response);
        }
      }
      return {
        newEmployee: savedEmployee,
        employeeGD: savedemployeeGD,
        employeeId: savedemployeeGD.employeeId,
      };
    };
    saveRequest()
      .then((result) => {
        response.data = {
          message: "employee details added successfully",
          data: result,
        };
        res.status(200).send(response);
      })
      .catch((err: any) => console.log(err));
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

export const getEmployeeGD = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    response.data = await EmployeeGD.find({}).populate("store", { storeName: true }).populate("role", { roleName: true });
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

export const getEmployeeGDById = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findEmployeeGd = await EmployeeGD.find({ employeeId: id });

    if (!findEmployeeGd) {
      response.status = { code: 400, message: "Location not found!" };
      res.status(400).send(response);
      return;
    }
    response.data = findEmployeeGd;
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

export const updateEmployeeGD = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();

  try {
    const { id } = req.params;

    const findEmployeeGd = await EmployeeGD.find({ employeeId: id });

    if (!findEmployeeGd) {
      response.status = { code: 400, message: "Employee Details not found!" };
      res.status(400).send(response);
      return;
    }

    // const update = req.body;

    // try {
    //   const emp = await EmployeeGD.findOneAndUpdate({ employeeId: id }, update);
    //   response.data = "Employee Details updated successfully";
    //   res.status(200).send(response);
    // } catch (error) {
    //   response.status = { code: 500, message: "Server Error" };
    //   res.status(500).send(response);
    // }
    const saveRequest = async () => {
      const update = req.body;
      const updatedemployeeGD = await EmployeeGD.findOneAndUpdate({ employeeId: id }, update);

      const updatedEmployee = await Employee.findByIdAndUpdate(id, update);
      return {
        newEmployee: updatedEmployee,
        employeeGD: updatedemployeeGD,
        employeeId: id,
      };
    };

    saveRequest()
      .then((result) => {
        response.data = {
          message: "employee details updated successfully",
          data: result,
        };
        res.status(200).send(response);
      })
      .catch((err: any) => console.log(err));
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

export const deleteEmployeeGD = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findEmployeeGd = await EmployeeGD.find({ employeeId: id });
    if (!findEmployeeGd) {
      response.status = { code: 400, message: "Employee Details not found!" };
      res.status(400).send(response);
      return;
    }

    try {
      const emp = await EmployeeGD.findOneAndDelete({ employeeId: id });
      response.data = "Employee Details deleted successfully";
      res.status(200).send(response);
    } catch (error) {
      response.status = { code: 500, message: "Server Error" };
      res.status(500).send(response);
    }
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

export const getEmployeeGDForDownload = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    // const { id } = req.params;
    // const employee = await Employee.find({}).populate("store").populate("role");

    // response.data = await EmployeeGD.findOne();
    response.data = "sdfhgsdhsa";

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
