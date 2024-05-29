/* eslint-disable @typescript-eslint/no-var-requires */
import { ApiResponse } from "../models/ApiResponse";
import { Request, Response } from "express";
import { Summary } from "../services/employeeSummary.service";
const pdf = require("html-pdf");
import { pdfGeneratorContract } from "../documents-generator/pdfGeneratorContract";
import { pdfGeneratorSummary } from "../documents-generator/pdfGeneratorSummary";
const fs = require("fs");

export const GenerateContractPdf = async (req: Request, res: Response): Promise<void> => {
    const response = new ApiResponse();
    try {
      const { id } = req.params;
    const summary = new Summary();
    const data = await summary.getEmployeeSummary(id);
    console.log(
    data  
    );
      // const result = await holidayMasterSchema.validateAsync(req.body);
      // const findNationality = await DocumentAccessMaster.findOne({ nationality: req.body.nationality });
      pdf.create(pdfGeneratorContract(data), {
        border: {
          "top": "0.3in",
          "right": "0.2in",
          "left": "0.2in",
          "bottom":"0in"
        },
        "header": {
          "contents": " <hr class='solid'>"
        },
        "footer": {
          "contents": {
            default: "<hr class='solid'><span style=\"color: #444;\">{{page}}</span>/<span>{{pages}}</span>", // fallback value
          }
        },
      }).toStream(function (err:any, stream:any) {
        if (err) return res.send(err);
        res.type("application/pdf");
        stream.pipe(res);
    });
    
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
  
  export const GenerateSummaryPdf = async (req: Request, res: Response): Promise<void> => {
    const response = new ApiResponse();
    try {
      const { id } = req.params;
    const summary = new Summary();
    const data = await summary.getEmployeeSummary(id);
    console.log(
    data  
    );
      // const result = await holidayMasterSchema.validateAsync(req.body);
      // const findNationality = await DocumentAccessMaster.findOne({ nationality: req.body.nationality });
      pdf.create(pdfGeneratorSummary(data), {}).toStream(function (err:any, stream:any) {
        if (err) return res.send(err);
        res.type("application/pdf");
        stream.pipe(res);
    });
    
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
  