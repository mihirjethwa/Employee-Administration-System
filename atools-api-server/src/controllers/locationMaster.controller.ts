import { ApiResponse } from "../models/ApiResponse";
import { Request, Response } from "express";
import LocationMaster from "../models/LocationMaster";
import { holidayMasterSchema, locationMasterSchema, roleMasterSchema } from "../helpers/mastersValidationSchema";
import asyncHandler from "../middleware/asyncHandler";

export const addLocationMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const result = await locationMasterSchema.validateAsync(req.body);

    const findLocation = await LocationMaster.findOne({ locationCode: req.body.locationCode });

    if (findLocation) {
      response.status = { code: 400, message: "Location with this code already exist!" };
      res.status(400).send(response);
      return;
    }

    console.log(req.body);

    const location = new LocationMaster({
      location: req.body.location,
      locationCode: req.body.locationCode,
      state: req.body.state,
      city: req.body.city,
      createdBy: req.body.employee.id,
    });

    location
      .save()
      .then((user: Object) => {
        response.data = "Location added successfully";
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

export const getLocationMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    response.data = await LocationMaster.find({}).populate("createdBy", { userName: true, firstName: true, lastName: true });
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
export const getLocationMasterById = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findLocation = await LocationMaster.findById(id).populate("createdBy", { userName: true, firstName: true, lastName: true });
    if (!findLocation) {
      response.status = { code: 400, message: "Location not found!" };
      res.status(400).send(response);
      return;
    }
    response.data = findLocation;
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

export const updateLocationMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();

  try {
    const { id } = req.params;

    const findLocation = await LocationMaster.findById(id);
    if (!findLocation) {
      response.status = { code: 400, message: "Location not found!" };
      res.status(400).send(response);
      return;
    }

    const update = req.body;

    try {
      const location = await LocationMaster.findByIdAndUpdate(id, update);
      response.data = "Location updated successfully";
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

export const deleteLocationMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findLocation = await LocationMaster.findById(id);

    if (!findLocation) {
      response.status = { code: 400, message: "Location not found!" };
      res.status(400).send(response);
      return;
    }

    try {
      const location = await LocationMaster.findByIdAndDelete(id);
      response.data = "Location deleted successfully";
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
