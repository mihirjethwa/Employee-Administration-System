import { ApiResponse } from "../models/ApiResponse";
import { Request, Response } from "express";
import Nationality from "../models/Nationality";

export const addNationality = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const findNationality = await Nationality.findOne({ nationalityName: req.body.nationalityName });

    if (findNationality) {
      response.status = { code: 400, message: "Nationality already exist!" };
      res.status(400).send(response);
      return;
    }

    const nationality = new Nationality({
      nationalityName: req.body.nationalityName,
      createdBy: req.body.employee.id,
    });

    nationality.save().then((user: Object) => {
      response.data = "Nationality added successfully";
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

export const getNationality = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    response.data = await Nationality.find({}).populate("createdBy", { userName: true });
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

export const getNationalityById = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findNationality = await Nationality.findById(id).populate("createdBy", { userName: true });

    if (!findNationality) {
      response.status = { code: 400, message: "Nationality not found!" };
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

export const updateNationality = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();

  try {
    const { id } = req.params;

    const findNationality = await Nationality.findById(id);

    if (!findNationality) {
      response.status = { code: 400, message: "Nationality not found!" };
      res.status(400).send(response);
      return;
    }

    const update = req.body;

    try {
      const nationality = await Nationality.findByIdAndUpdate(id, update);
      response.data = "Nationality updated successfully";
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

export const deleteNationality = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findNationality = await Nationality.findById(id);

    if (!findNationality) {
      response.status = { code: 400, message: "Nationality not found!" };
      res.status(400).send(response);
      return;
    }

    try {
      const role = await Nationality.findByIdAndDelete(id);
      response.data = "Nationality deleted successfully";
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
