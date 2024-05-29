import { ApiResponse } from "../models/ApiResponse";
import { Request, Response } from "express";
import DocumentAccessMaster from "../models/DocumentAccessMaster";

export const addDocumentAccessMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    // const result = await holidayMasterSchema.validateAsync(req.body);
    // const findNationality = await DocumentAccessMaster.findOne({ nationality: req.body.nationality });

    const nat = new DocumentAccessMaster({
      documentGroupName: req.body.documentGroupName,
      accessGiven: req.body.accessGiven,
      documents: req.body.documents,
      createdBy: req.body.employee.id,
    });

    nat
      .save()
      .then((user: Object) => {
        response.data = "Document Master added successfully";
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

export const getDocumentAccessMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    response.data = await DocumentAccessMaster.find({}).populate("createdBy", { userName: true, firstName: true, lastName: true }).populate("accessGiven", { roleName: true});
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

export const getDocumentAccessMasterById = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findNationality = await DocumentAccessMaster.findById(id).populate("createdBy", { userName: true, firstName: true, lastName: true }).populate("nationality");
    if (!findNationality) {
      response.status = { code: 400, message: "Document Master not found!" };
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

export const updateDocumentAccessMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();

  try {
    const { id } = req.params;

    const findNationality = await DocumentAccessMaster.findById(id);
    if (!findNationality) {
      response.status = { code: 400, message: "Document not found!" };
      res.status(400).send(response);
      return;
    }

    const update = req.body;

    try {
      const nat = await DocumentAccessMaster.findByIdAndUpdate(id, update);
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

export const deleteDocumentAccessMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findNationality = await DocumentAccessMaster.findById(id);
    if (!findNationality) {
      response.status = { code: 400, message: "Document Master not found!" };
      res.status(400).send(response);
      return;
    }

    try {
      const nationality = await DocumentAccessMaster.findByIdAndDelete(id);
      response.data = "Document Master deleted successfully";
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
