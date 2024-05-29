import { ApiResponse } from "../models/ApiResponse";
import { Request, Response } from "express";
import EmployeeRight from "../models/EmployeeRight";
import {} from "../helpers/mastersValidationSchema";
import { createEmploeeRight } from "../services/employeeRight.service";
import Employee from "../models/Employee";
export const addEmployeeRight = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    // const result = await storeMasterSchema.validateAsync(req.body);

    const findRight = await EmployeeRight.findOne({ employeeId: req.body.employeeId });

    if (findRight) {
      response.status = { code: 400, message: "Rights for employee already exist!" };
      res.status(400).send(response);
      return;
    }

    const saveRequest = async () => {
      const employeeRight = await createEmploeeRight(req.body);
      const savedemployeeRight = await employeeRight.save();
      const StatusUpdate = await Employee.findByIdAndUpdate(req.body.employeeId, {
        pageStatus: "3",
      });
      return {
        employeeRight: savedemployeeRight,
        employeeStatus: StatusUpdate,
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

export const getEmployeeRight = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    response.data = await EmployeeRight.find({});
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

export const getEmployeeRightById = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findEmployeeRight = await EmployeeRight.find({ employeeId: id });
    if (!findEmployeeRight) {
      response.status = { code: 400, message: "Employee Right not found!" };
      res.status(400).send(response);
      return;
    }
    response.data = findEmployeeRight;
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

export const updateEmployeeRight = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();

  try {
    const { id } = req.params;

    const findEmployeeRight = await EmployeeRight.find({ employeeId: id });
    if (!findEmployeeRight) {
      response.status = { code: 400, message: "Employee Right not found!" };
      res.status(400).send(response);
      return;
    }

    const update = req.body;

    try {
      const emp = await EmployeeRight.findOneAndUpdate({ employeeId: id }, update);
      response.data = "Employee Right updated successfully";
      res.status(200).send(response);
    } catch (error) {
      console.log(error);
      response.status = { code: 500, message: "Server Error" };
      res.status(500).send(response);
    }
  } catch (error) {
    console.log(error);
    if (error.isJoi) {
      response.status = { code: 422, message: error.message };
      res.status(422).send(response);
      return;
    }

    response.status = { code: 500, message: "Server Error" };
    res.status(500).send(response);
  }
};

export const deleteEmployeeRight = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findEmployeeRight = await EmployeeRight.find({ employeeId: id });
    if (!findEmployeeRight) {
      response.status = { code: 400, message: "Employee Details not found!" };
      res.status(400).send(response);
      return;
    }

    try {
      const emp = await EmployeeRight.findOneAndDelete({ employeeId: id });
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
