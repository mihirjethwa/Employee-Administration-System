import { ApiResponse } from "../models/ApiResponse";
import { Request, Response } from "express";
import DocumentMaster from "../models/DocumentMaster";
import { holidayMasterSchema, locationMasterSchema, roleMasterSchema } from "../helpers/mastersValidationSchema";
import { createDocumentMaster } from "../services/documentMaster.service";

export const addDocumentMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    // const result = await holidayMasterSchema.validateAsync(req.body);
    const findRole = await DocumentMaster.findOne({ role: req.body.role });

    if (findRole) {
      response.status = { code: 400, message: "Role with this code already exist!" };
      res.status(400).send(response);
      return;
    }
    // const document = new DocumentMaster({
    //   // roleId: req.body.roleId,
    //   role: req.body.role,
    //   documentName: req.body.documentName,
    //   required: req.body.required,
    //   createdBy: req.body.employee.id,
    // });

    const document = await createDocumentMaster(req.body);

    document
      .save()
      .then((user: Object) => {
        response.data = "Document added successfully";
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

export const getDocumentMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    response.data = await DocumentMaster.find({}).populate("createdBy", { userName: true, firstName: true, lastName: true }).populate("role", { roleName: true });
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

export const getDocumentMasterById = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findDocument = await DocumentMaster.find({ role: req.body.role }).populate("createdBy", { userName: true, firstName: true, lastName: true }).populate("role", { roleName: true });
    if (!findDocument) {
      response.status = { code: 400, message: "Document not found!" };
      res.status(400).send(response);
      return;
    }

    response.data = findDocument;
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

export const updateDocumentMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();

  try {
    const { id } = req.params;

    const findDocument = await DocumentMaster.find({ role: req.body.role });
    if (!findDocument) {
      response.status = { code: 400, message: "Document not found!" };
      res.status(400).send(response);
      return;
    }

    const update = req.body;

    try {
      const holiday = await DocumentMaster.findByIdAndUpdate(id, update);
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

export const deleteDocumentMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findDocument = await DocumentMaster.findById(id);
    if (!findDocument) {
      response.status = { code: 400, message: "Document not found!" };
      res.status(400).send(response);
      return;
    }

    try {
      const document = await DocumentMaster.findByIdAndDelete(id);
      response.data = "Document deleted successfully";
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
