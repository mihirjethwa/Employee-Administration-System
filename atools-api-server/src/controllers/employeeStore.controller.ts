import { ApiResponse } from "../models/ApiResponse";
import { Request, Response } from "express";
import EmployeeStore from "../models/EmployeeStore";
import { } from "../helpers/mastersValidationSchema";
import { createEmployeeStore } from "../services/employeeStore.service";

export const addEmployeeStore = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const employeeStore = await createEmployeeStore(req.body);

    employeeStore.save().then((user: Object) => {
      response.data = employeeStore;
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

export const getEmployeeStore = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    response.data = await EmployeeStore.find({});
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

export const getEmployeeStoreById = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findEmployeeGd = await EmployeeStore.find({ employeeId: id });
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

export const updateEmployeeStore = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();

  try {
    const { id } = req.params;

    const findEmployeeGd = await EmployeeStore.find({ employeeId: id });
    if (!findEmployeeGd) {
      response.status = { code: 400, message: "Employee Details not found!" };
      res.status(400).send(response);
      return;
    }

    const update = req.body;

    try {
      const emp = await EmployeeStore.findOneAndUpdate({ employeeId: id }, update);
      response.data = "Employee Details updated successfully";
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

export const deleteEmployeeStore = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findEmployeeGd = await EmployeeStore.find({ employeeId: id });
    if (!findEmployeeGd) {
      response.status = { code: 400, message: "Employee Details not found!" };
      res.status(400).send(response);
      return;
    }

    try {
      const emp = await EmployeeStore.findOneAndDelete({ employeeId: id });
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
