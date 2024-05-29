import { ApiResponse } from "../models/ApiResponse";
import { Request, Response } from "express";
import HolidayMaster from "../models/HolidayMaster";
import { holidayMasterSchema, locationMasterSchema, roleMasterSchema } from "../helpers/mastersValidationSchema";
import { createHolidayMaster } from "../services/holidayMaster.service";

export const addHolidayMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const result = await holidayMasterSchema.validateAsync(req.body);

    // const holiday = new HolidayMaster({
    //   holidayDate: req.body.holidayDate,
    //   holidayReason: req.body.holidayReason,
    //   createdBy: req.body.employee.id,
    // });

    const holiday = await createHolidayMaster(req.body);

    holiday
      .save()
      .then((user: Object) => {
        response.data = "Holiday added successfully";
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

export const getHolidayMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    response.data = await HolidayMaster.find({}).populate("createdBy", { userName: true, firstName: true, lastName: true });
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

export const getHolidayMasterById = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findHoliday = await HolidayMaster.findById(id).populate("createdBy", { userName: true, firstName: true, lastName: true });

    if (!findHoliday) {
      response.status = { code: 400, message: "Holiday not found!" };
      res.status(400).send(response);
      return;
    }
    response.data = findHoliday;
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

export const updateHolidayMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();

  try {
    const { id } = req.params;

    const findHoliday = await HolidayMaster.findById(id);

    if (!findHoliday) {
      response.status = { code: 400, message: "Holiday not found!" };
      res.status(400).send(response);
      return;
    }

    const update = req.body;

    try {
      const holiday = await HolidayMaster.findByIdAndUpdate(id, update);
      response.data = "Holiday updated successfully";
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

export const deleteHolidayMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findHoliday = await HolidayMaster.findById(id);

    if (!findHoliday) {
      response.status = { code: 400, message: "Holiday not found!" };
      res.status(400).send(response);
      return;
    }

    try {
      const holiday = await HolidayMaster.findByIdAndDelete(id);
      response.data = "Holiday deleted successfully";
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
