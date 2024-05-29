import { ApiResponse } from "../models/ApiResponse";
import { Request, Response } from "express";
import EmployeePayslip from "../models/EmployeePayslip";
import {} from "../helpers/mastersValidationSchema";
import { createEmployeePayslip } from "../services/employeePayslip.service";
import Employee from "../models/Employee";
import { find } from "lodash";
export const addEmployeePayslip = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    // const result = await storeMasterSchema.validateAsync(req.body);

    // const findStatus = await EmployeeStatus.findOne({ employeeId: req.body.employeeId });

    // if (findStatus) {
    //   response.status = { code: 400, message: "Rights for employee already exist!" };
    //   res.status(400).send(response);
    //   return;
    // }

    const employeePayslip = await createEmployeePayslip(req.body);

    employeePayslip
      .save()
      .then((result: any) => {
        response.data = {
          message: "Employee Payslip added successfully",
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

export const getEmployeePayslip = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;
    const employeePayslip = await EmployeePayslip.find({ employeeId: id });
    const employee = await Employee.findById(id).populate("store");
    response.data = { employee, employeePayslip };
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

export const getEmployeePayslipById = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const employeePayslip = await EmployeePayslip.findOne({ employeeId: id });

    // if (!findEmployeeStatus) {
    //   response.status = { code: 400, message: "Employee Status not found!" };
    //   res.status(400).send(response);
    //   return;
    // }

    response.data = employeePayslip;
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

export const updateEmployeePayslip = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();

  try {
    const { id } = req.params;

    const findEmployeeRight = await EmployeePayslip.find({ employeeId: id });

    if (!findEmployeeRight) {
      response.status = { code: 400, message: "Employee Payslip not found!" };
      res.status(400).send(response);
      return;
    }

    const update = req.body;

    try {
      const empStatus = await EmployeePayslip.findOneAndUpdate({ employeeId: id }, update);
      const emp = await Employee.findByIdAndUpdate(id, update);
      response.data = "Employee Payslip updated successfully";
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

export const deleteEmployeePayslip = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findEmployeeRight = await EmployeePayslip.findById(id);
    if (!findEmployeeRight) {
      response.status = { code: 400, message: "Employee Payslip not found!" };
      res.status(400).send(response);
      return;
    }

    try {
      const emp = await EmployeePayslip.findByIdAndDelete(id);
      response.data = "Employee Payslip deleted successfully";
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
