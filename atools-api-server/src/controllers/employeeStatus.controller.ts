import { ApiResponse } from "../models/ApiResponse";
import { Request, Response } from "express";
import EmployeeStatus from "../models/EmployeeStatus";
import { } from "../helpers/mastersValidationSchema";
import { createEmployeeStatus } from "../services/employeeStatus.service";
import Employee from "../models/Employee";
import { find } from "lodash";
export const addEmployeeStatus = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    // const result = await storeMasterSchema.validateAsync(req.body);

    // const findStatus = await EmployeeStatus.findOne({ employeeId: req.body.employeeId });

    // if (findStatus) {
    //   response.status = { code: 400, message: "Rights for employee already exist!" };
    //   res.status(400).send(response);
    //   return;
    // }

    const saveRequest = async () => {
      const employeeStatus = await createEmployeeStatus(req.body);
      const savedemployeeRight = await employeeStatus.save();
      const emp = await Employee.findByIdAndUpdate(req.body.employeeId, req.body);
      //   const StatusUpdate = await Employee.findByIdAndUpdate(req.body.employeeId, {
      //     store: req.body.store,
      //     role: req.body.role,
      //     canLogin: req.body.canLogin,
      //     empStatus: req.body.empStatus,
      //   });
    };
    saveRequest().then((result) => {
      response.data = {
        message: "employee Status added successfully",
        data: result,
      };
      res.status(200).send(response);
    }).catch((err: any) => console.log(err));
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

export const getEmployeeStatus = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    response.data = await EmployeeStatus.find({});
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

export const getEmployeeStatusById = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findEmployeeStatus = await EmployeeStatus.findOne({ employeeId: id });
    const findEmployee = await Employee.findById(id);

    // if (!findEmployeeStatus) {
    //   response.status = { code: 400, message: "Employee Status not found!" };
    //   res.status(400).send(response);
    //   return;
    // }

    response.data = { findEmployee, findEmployeeStatus };
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

export const updateEmployeeStatus = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();

  try {
    const { id } = req.params;

    const findEmployeeRight = await EmployeeStatus.find({ employeeId: id });

    if (!findEmployeeRight) {
      response.status = { code: 400, message: "Employee Right not found!" };
      res.status(400).send(response);
      return;
    }

    const update = req.body;

    try {
      const empStatus = await EmployeeStatus.findOneAndUpdate({ employeeId: id }, update);
      const emp = await Employee.findByIdAndUpdate(id, update);
      response.data = "Employee Right updated successfully";
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

export const deleteEmployeeStatus = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findEmployeeRight = await EmployeeStatus.find({ employeeId: id });
    if (!findEmployeeRight) {
      response.status = { code: 400, message: "Employee Details not found!" };
      res.status(400).send(response);
      return;
    }

    try {
      const emp = await EmployeeStatus.findOneAndDelete({ employeeId: id });
      response.data = "Employee Right deleted successfully";
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
