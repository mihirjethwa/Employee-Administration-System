import { ApiResponse } from "../models/ApiResponse";
import { Request, Response } from "express";
import EmployeeFeedback from "../models/EmployeeFeedback";
import {} from "../helpers/mastersValidationSchema";
import { createEmployeeFeedback } from "../services/employeeFeedback.service";
import Employee from "../models/Employee";
import { find } from "lodash";
export const addEmployeeFeedback = async (req: Request, res: Response): Promise<void> => {
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
      const employeeFeedback = await createEmployeeFeedback(req.body);
      const savedemployeeRight = await employeeFeedback.save();
      //   const emp = await Employee.findByIdAndUpdate(req.body.employeeId, req.body);
      //   const StatusUpdate = await Employee.findByIdAndUpdate(req.body.employeeId, {
      //     store: req.body.store,
      //     role: req.body.role,
      //     canLogin: req.body.canLogin,
      //     empStatus: req.body.empStatus,
      //   });
    };
    saveRequest()
      .then((result) => {
        response.data = {
          message: "employee feedback added successfully",
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

export const getEmployeeFeedback = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;
    response.data = await EmployeeFeedback.find({ employeeId: id });
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

export const getEmployeeFeedbackById = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    // const employeeFeedback = await EmployeeFeedback.findOne({ employeeId: id });
    const employee = await Employee.findById(id).populate("store");

    // if (!findEmployeeStatus) {
    //   response.status = { code: 400, message: "Employee Status not found!" };
    //   res.status(400).send(response);
    //   return;
    // }

    response.data = { employee };
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

export const updateEmployeeFeedback = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();

  try {
    const { id } = req.params;

    const findEmployeeRight = await EmployeeFeedback.find({ employeeId: id });

    if (!findEmployeeRight) {
      response.status = { code: 400, message: "Employee Right not found!" };
      res.status(400).send(response);
      return;
    }

    const update = req.body;

    try {
      const empStatus = await EmployeeFeedback.findOneAndUpdate({ employeeId: id }, update);
      const emp = await Employee.findByIdAndUpdate(id, update);
      response.data = "Employee feedback updated successfully";
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

export const deleteEmployeeFeedback = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findEmployeeRight = await EmployeeFeedback.findById(id);

    if (!findEmployeeRight) {
      response.status = { code: 400, message: "Employee Feedback not found!" };
      res.status(400).send(response);
      return;
    }

    try {
      const emp = await EmployeeFeedback.findByIdAndDelete(id);
      response.data = "Employee Feedback deleted successfully";
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
