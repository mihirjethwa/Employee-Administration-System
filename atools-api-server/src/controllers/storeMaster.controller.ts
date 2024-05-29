import { ApiResponse } from "../models/ApiResponse";
import { Request, Response } from "express";
import StoreMaster from "../models/StoreMaster";
import { holidayMasterSchema, storeMasterSchema, roleMasterSchema } from "../helpers/mastersValidationSchema";
import { createStoreMaster } from "../services/storeMaster.service";
import Employee from "../models/Employee";

export const addStoreMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const result = await storeMasterSchema.validateAsync(req.body);
    const store = await createStoreMaster(req.body);
    store
      .save()
      .then((user: Object) => {
        response.data = "Store added successfully";
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

export const getStoreMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    response.data = await StoreMaster.find({});
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

export const updateStoreMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();

  try {
    const { id } = req.params;

    const findStore = await StoreMaster.findById(id);
    if (!findStore) {
      response.status = { code: 400, message: "Store not found!" };
      res.status(400).send(response);
      return;
    }

    const update = req.body;

    try {
      const store = await StoreMaster.findByIdAndUpdate(id, update);
      response.data = "Store updated successfully";
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

export const deleteStoreMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findStore = await StoreMaster.findById(id);
    if (!findStore) {
      response.status = { code: 400, message: "Store not found!" };
      res.status(400).send(response);
      return;
    }
    const employees = await Employee.find({ store: id });
    const test = employees.map((v) => v.firstName + " " + v.lastName);
    if (test.length != 0) {
      response.status = { code: 400, message: "Store cannot be deleted because its currently used by " + test.join(", ") };
      res.status(400).send(response);
      return;
    }

    try {
      const store = await StoreMaster.findByIdAndDelete(id);
      response.data = "Store deleted successfully";
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
