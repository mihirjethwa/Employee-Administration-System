import { ApiResponse } from "../models/ApiResponse";
import { Request, Response } from "express";
import EmployeeContract from "../models/EmployeeContract";
import { createEmployeeContract } from "../services/employeeContract.service";
import Employee from "../models/Employee";

export const addEmployeeContract = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {

    const employeeContract = await EmployeeContract.findOne({ employeeId: req.body.employeeId });
    let contract: any
    if (!employeeContract) {
      const createEmpoyeeContract = await createEmployeeContract(req.body);
      contract = await createEmpoyeeContract.save()
    } else {
      contract = await EmployeeContract.findOneAndUpdate({ employeeId: req.body.employeeId }, req.body);
    }


    response.data = {
      employeeContract: contract,
    };
    response.status = { code: 200, message: "Employee contract detail saved successfully." };
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

export const getEmployeeContract = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    response.data = await EmployeeContract.find({});
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

export const getEmployeeContractById = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findEmployeeContract = await EmployeeContract.find({ employeeId: id });
    if (!findEmployeeContract) {
      response.status = { code: 400, message: "Employee Contract not found!" };
      res.status(400).send(response);
      return;
    }
    response.data = findEmployeeContract;
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

export const updateEmployeeContract = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();

  try {
    const { id } = req.params;

    const findEmployeeContract = await EmployeeContract.find({ employeeId: id });
    if (!findEmployeeContract) {
      response.status = { code: 400, message: "Employee Contract not found!" };
      res.status(400).send(response);
      return;
    }

    const update = req.body;

    try {
      const emp = await EmployeeContract.findOneAndUpdate({ employeeId: req.body.employeeId }, update);
      response.data = "Employee Contract updated successfully";
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

export const deleteEmployeeContract = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findEmployeeContract = await EmployeeContract.find({ employeeId: id });

    if (!findEmployeeContract) {
      response.status = { code: 400, message: "Employee Details not found!" };
      res.status(400).send(response);
      return;
    }

    try {
      const emp = await EmployeeContract.findOneAndDelete({ employeeId: id });
      response.data = "Employee Contract deleted successfully";
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
