import { ApiResponse } from "../models/ApiResponse";
import { Request, Response } from "express";
import NationalityMaster from "../models/NationalityMaster";
import EmployeeRight from "../models/EmployeeRight";

export const addNationalityMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    // const result = await holidayMasterSchema.validateAsync(req.body);
    // const findNationality = await NationalityMaster.findOne({ nationality: req.body.nationality });

    const nat = new NationalityMaster({
      nationalityName: req.body.nationalityName,
      subLocation: req.body.subLocation,
      documentGroups: req.body.documentGroups,
      createdBy: req.body.employee.id,
    });

    nat
      .save()
      .then((user: Object) => {
        response.data = "Nationality Master added successfully";
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

export const getNationalityMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    response.data = await NationalityMaster.find({}).populate("createdBy", { userName: true, firstName: true, lastName: true }).populate("nationality");
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

export const getNationalityMasterById = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findNationality = await NationalityMaster.findById(id).populate("createdBy", { userName: true, firstName: true, lastName: true }).populate("nationality");
    if (!findNationality) {
      response.status = { code: 400, message: "Nationality Master not found!" };
      res.status(400).send(response);
      return;
    }
    response.data = findNationality;
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

export const updateNationalityMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();

  try {
    const { id } = req.params;

    const findNationality = await NationalityMaster.findById(id);
    if (!findNationality) {
      response.status = { code: 400, message: "Nationality not found!" };
      res.status(400).send(response);
      return;
    }

    const update = req.body;

    try {
      const nat = await NationalityMaster.findByIdAndUpdate(id, update);
      response.data = "Document updated successfully";
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

export const deleteNationalityMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findNationality = await NationalityMaster.findById(id);
    if (!findNationality) {
      response.status = { code: 400, message: "Nationality Master not found!" };
      res.status(400).send(response);
      return;
    }

    const employees = await EmployeeRight.find({ nationality: id });

    // const test = employees.map((v) => v.firstName + " " + v.lastName);
    if (employees.length != 0) {
      response.status = { code: 400, message: "Nationality cannot be deleted because its currently used" };
      res.status(400).send(response);
      return;
    }

    try {
      const nationality = await NationalityMaster.findByIdAndDelete(id);
      response.data = "Nationality Master deleted successfully";
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
