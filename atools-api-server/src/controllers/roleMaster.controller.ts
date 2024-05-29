import { ApiResponse } from "../models/ApiResponse";
import { Request, Response } from "express";
import RoleMaster from "../models/RoleMaster";
import { holidayMasterSchema, locationMasterSchema, roleMasterSchema } from "../helpers/mastersValidationSchema";
import { createRoleMaster } from "../services/roleMaster.service";
import Employee from "../models/Employee";
import AccessMaster from "../models/AccessMaster";
import DocumentAccessMaster from "../models/DocumentAccessMaster";

export const addRoleMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const result = await roleMasterSchema.validateAsync(req.body);

    const findRole = await RoleMaster.findOne({ roleName: req.body.roleName });

    if (findRole) {
      response.status = { code: 400, message: "Role with this code already exist!" };
      res.status(400).send(response);
      return;
    }

    // const role = new RoleMaster({
    //   roleName: req.body.roleName,
    //   createdBy: req.body.employee.id,
    // });

    const role = await createRoleMaster(req.body);

    role
      .save()
      .then((user: Object) => {
        response.data = "Role added successfully";
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

export const getRoleMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const roleMasterList = await RoleMaster.find({}).populate("createdBy", { userName: true, firstName: true, lastName: true });
    for (let roleMaster of roleMasterList) {
      roleMaster.membersListed = await Employee.find({ role: roleMaster._id }).count();
    }

    response.data = roleMasterList;
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

export const getRoleMasterById = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findRole = await RoleMaster.findById(id).populate("createdBy", { userName: true, firstName: true, lastName: true });
    if (!findRole) {
      response.status = { code: 400, message: "Role not found!" };
      res.status(400).send(response);
      return;
    }

    findRole.membersListed = await Employee.find({ role: findRole._id }).count();
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

export const updateRoleMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();

  try {
    const { id } = req.params;

    const findRole = await RoleMaster.findById(id);

    if (!findRole) {
      response.status = { code: 400, message: "Location not found!" };
      res.status(400).send(response);
      return;
    }

    const update = req.body;

    try {
      const role = await RoleMaster.findByIdAndUpdate(id, update);
      response.data = "Role updated successfully";
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

export const deleteRoleMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findRole = await RoleMaster.findById(id);
    if (!findRole) {
      response.status = { code: 400, message: "Role not found!" };
      res.status(400).send(response);
      return;
    }
    const employees = await Employee.find({ role: id });
    const document = await DocumentAccessMaster.find({});

    var item = false;
    var names: string[] = [];
    document.forEach((obj: any) => {
      const arr = obj.documents.forEach((val: any) => {
        if (val.accessGiven.includes(id)) {
          item = true;
          names.push(obj.documentGroupName);
        }
      });
    });

    const test = employees.map((v) => v.firstName + " " + v.lastName);
    if (test.length != 0) {
      response.status = { code: 400, message: "Role cannot be deleted because its currently used by " + test.join(", ") };
      res.status(400).send(response);
      return;
    }

    if (item) {
      response.status = { code: 400, message: "Role cannot be deleted because its currently used in " + names.join(", ") + " of Document Access Master" };
      res.status(400).send(response);
      return;
    }

    try {
      const role = await RoleMaster.findByIdAndDelete(id);
      role?.remove();
      const access = await AccessMaster.findOneAndDelete({ role: id });
      access?.remove();
      response.data = "Role deleted successfully";
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
