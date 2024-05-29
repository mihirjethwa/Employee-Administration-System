import { ApiResponse } from "../models/ApiResponse";
import { Request, Response } from "express";
import AccessMaster from "../models/AccessMaster";
import { holidayMasterSchema, locationMasterSchema, roleMasterSchema } from "../helpers/mastersValidationSchema";
import { createAccessMaster } from "../services/accessMaster.service";

export const addAccessMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const findRole = await AccessMaster.findOne({ role: req.body.role });

    if (findRole) {
      response.status = { code: 400, message: "Access for this role already exist!" };
      res.status(400).send(response);
      return;
    }

    // const access = new AccessMaster({
    //   role: req.body.role,
    //   modulesAccess: req.body.modulesAccess,
    //   // moduleOne: req.body.moduleOne,
    //   // moduleTwo: req.body.moduleTwo,
    //   // moduleThree: req.body.moduleThree,
    //   // moduleFour: req.body.moduleFour,
    //   // moduleFive: req.body.moduleFive,
    //   // moduleSix: req.body.moduleSix,
    //   createdBy: req.body.employee.id,
    // });

    const access = await createAccessMaster(req.body);

    access
      .save()
      .then((user: Object) => {
        response.data = "Access added successfully";
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

export const getAccessMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    response.data = await AccessMaster.find({}).populate("createdBy", { userName: true, firstName: true, lastName: true }).populate("role", { roleName: true });
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

export const getAccessMasterById = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findRole = await AccessMaster.find({ role: req.body.role }).populate("createdBy", { userName: true, firstName: true, lastName: true });
    if (!findRole) {
      response.status = { code: 400, message: "Access details not found!" };
      res.status(400).send(response);
      return;
    }
    response.data = findRole;
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

export const updateAccessMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();

  try {
    const { id } = req.params;

    const findRole = await AccessMaster.find({ role: req.body.role });
    if (!findRole) {
      response.status = { code: 400, message: "Access details not found!" };
      res.status(400).send(response);
      return;
    }

    const update = req.body;

    try {
      const access = await AccessMaster.findByIdAndUpdate(id, update);
      response.data = "Access Details updated successfully";
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

export const deleteAccessMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findRole = await AccessMaster.findById(id);
    if (!findRole) {
      response.status = { code: 400, message: "Access details not found!" };
      res.status(400).send(response);
      return;
    }

    try {
      const access = await AccessMaster.findByIdAndDelete(id);
      response.data = "Access details deleted successfully";
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
