import { ApiResponse } from "../models/ApiResponse";
import { Request, Response } from "express";
import EmployeeDocs from "../models/EmployeeDocs";
import EmployeeRight from "../models/EmployeeRight";
import { createArray, createEmploeeDocs } from "../services/employeeDocs.service";
import Employee from "../models/Employee";
import EmployeePayroll from "../models/EmployeePayroll";
import EmployeeContract from "../models/EmployeeContract";
import lodash from "lodash";
import JSZip from "jszip";
import { S3Service } from "../services/s3.service";
import AWS from "aws-sdk";
import { createReadStream, ReadStream, createWriteStream, WriteStream } from "fs";
import fs from "fs";

export const addEmployeeDocs = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();

  try {
    const employeeDocs = await EmployeeDocs.findOne({ employeeId: req.body.employeeId });
    let docs: any;
    if (!employeeDocs) {
      const createEmploeeDocsObj = await createEmploeeDocs(req.body);
      docs = await createEmploeeDocsObj.save();
    } else {
      docs = await EmployeeDocs.findOneAndUpdate({ employeeId: req.body.employeeId }, req.body);
    }

    const employeeStatus = await Employee.findByIdAndUpdate(req.body.employeeId, { pageStatus: "4" });
    response.data = {
      employeeDocs: docs,
      employeeStatus: employeeStatus,
    };
    response.status = { code: 200, message: "Employee documents saved successfully." };
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

export const getEmployeeDocs = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    response.data = await EmployeeDocs.find({});
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

export const getEmployeeDocsById = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findEmployeeDocs = await EmployeeDocs.find({ employeeId: id });
    if (!findEmployeeDocs) {
      response.status = { code: 400, message: "Employee Docs not found!" };
      res.status(400).send(response);
      return;
    }
    response.data = findEmployeeDocs;
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

export const updateEmployeeDocs = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();

  try {
    const { id } = req.params;

    const findEmployeeDocs = await EmployeeDocs.find({ employeeId: id });
    if (!findEmployeeDocs) {
      response.status = { code: 400, message: "Employee Docs not found!" };
      res.status(400).send(response);
      return;
    }

    const update = req.body;

    try {
      response.data = "Employee Docs updated successfully";
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

export const deleteEmployeeDocs = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findEmployeeDocs = await EmployeeDocs.find({ employeeId: id });
    if (!findEmployeeDocs) {
      response.status = { code: 400, message: "Employee Details not found!" };
      res.status(400).send(response);
      return;
    }

    try {
      response.data = "Employee Right deleted successfully";
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

export const getDocumentList = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();

  try {
    const { id } = req.params;
    const data: any = {};

    const payrollDoc = await EmployeePayroll.findOne({ employeeId: id });
    if (payrollDoc) {
      data["payroll"] = payrollDoc.documents;
    }
    const rightToWorkDoc = await EmployeeRight.findOne({ employeeId: id });
    if (rightToWorkDoc) {
      let documents: any = rightToWorkDoc.document;
      if (documents && lodash.isArray(documents)) {
        documents = documents.map((document: any) => {
          if (document.expiryDate < new Date() && document.status?.toLowerCase() == "active") {
            document.status = "Expired";
          }
          return document;
        });
      }
      data["right_to_work"] = rightToWorkDoc.documents;
    }
    const contractDoc = await EmployeeContract.findOne({ employeeId: id });
    if (contractDoc) {
      data["contractDoc"] = contractDoc.documents;
    }
    const additionalDoc = await EmployeeDocs.findOne({ employeeId: id });
    if (additionalDoc) {
      data["additionalDoc"] = additionalDoc.documents;
    }
    response.data = data;
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

export const getZipFile = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { id } = req.params;

    const findEmployeeDocs = await EmployeeDocs.findOne({ employeeId: id });
    if (!findEmployeeDocs) {
      response.status = { code: 400, message: "Employee Details not found!" };
      res.status(400).send(response);
      return;
    }

    const images = createArray(findEmployeeDocs);
    const zip = new JSZip();
    const s3Service = new S3Service();
    images.forEach(function (image: any) {
      const file = s3Service.downloadFile(image.key);
      // var readStream: ReadStream = createReadStream(file.toString());
      // console.log(readStream);
      console.log(file);
      zip.file(image.fileName, file.toString());
    });

    try {
      // response.data = "Employee";
      // res.status(200).send(response);
      // res.download(zip);
      zip
        .generateNodeStream({ streamFiles: true })
        .pipe(fs.createWriteStream("out.zip"))
        .on("finish", function () {
          // JSZip generates a readable stream with a "end" event,
          // but is piped here in a writable stream which emits a "finish" event.
          console.log("out.zip written.");
        });
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
