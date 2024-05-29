import { ApiResponse } from "../models/ApiResponse";
import { Request, Response } from "express";
import EmployeePayroll from "../models/EmployeePayroll";
import { createEmployeePayroll } from "../services/emloyeePayroll.service";
import Employee from "../models/Employee";

export const addEmployeePayroll = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {

    const employeePayroll = await EmployeePayroll.findOne({ employeeId: req.body.employeeId });
    let payroll: any
    if (!employeePayroll) {
      const createEmpoyeePayroll = await createEmployeePayroll(req.body);
      payroll = await createEmpoyeePayroll.save()
    } else {
      payroll = await EmployeePayroll.findOneAndUpdate({ employeeId: req.body.employeeId }, req.body);
    }

    const employeeStatus = await Employee.findByIdAndUpdate(req.body.employeeId, { pageStatus: "2" });

    response.data = {
      employeePayroll: payroll,
      employeeStatus: employeeStatus,
    };
    response.status = { code: 200, message: "Employee payroll detail saved successfully." };
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
}

export const getEmployeePayroll = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    response.data = await EmployeePayroll.find({});
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

export const getEmployeePayrollById = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findEmployeePayroll = await EmployeePayroll.find({ employeeId: id });
    if (!findEmployeePayroll) {
      response.status = { code: 400, message: "Employee Payroll not found!" };
      res.status(400).send(response);
      return;
    }
    response.data = findEmployeePayroll;
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

export const updateEmployeePayroll = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();

  try {
    const { id } = req.params;

    const findEmployeePayroll = await EmployeePayroll.find({ employeeId: id });
    if (!findEmployeePayroll) {
      response.status = { code: 400, message: "Employee Payroll not found!" };
      res.status(400).send(response);
      return;
    }

    const update = req.body;

    try {
      const emp = await EmployeePayroll.findOneAndUpdate({ employeeId: req.body.employeeId }, update);
      response.data = "Employee Payroll updated successfully";
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

export const deleteEmployeePayroll = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findEmployeePayroll = await EmployeePayroll.find({ employeeId: id });

    if (!findEmployeePayroll) {
      response.status = { code: 400, message: "Employee Details not found!" };
      res.status(400).send(response);
      return;
    }

    try {
      const emp = await EmployeePayroll.findOneAndDelete({ employeeId: id });
      response.data = "Employee Payroll deleted successfully";
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
