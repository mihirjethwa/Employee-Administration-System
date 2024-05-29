import { ApiResponse } from "../models/ApiResponse";
import { Request, Response } from "express";
import LocationMaster from "../models/LocationMaster";
import StoreMaster from "../models/StoreMaster";
import HolidayMaster from "../models/HolidayMaster";
import RoleMaster from "../models/RoleMaster";
import DocumentMaster from "../models/DocumentMaster";
import AccessMaster from "../models/AccessMaster";
import NationalityMaster from "../models/NationalityMaster";
import DocumentAccessMaster from "../models/DocumentAccessMaster";

export const getCountMaster = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const locationCount = await LocationMaster.countDocuments();
    const storeCount = await StoreMaster.countDocuments();
    const holidayCount = await HolidayMaster.countDocuments();
    const roleCount = await RoleMaster.countDocuments();
    const documentCount = await DocumentMaster.countDocuments();
    const accessCount = await AccessMaster.countDocuments();
    const nationalityCount = await NationalityMaster.countDocuments();
    const documentAccessCount = await DocumentAccessMaster.countDocuments();
    const data = {
      locationCount: locationCount,
      storeCount: storeCount,
      holidayCount: holidayCount,
      roleCount: roleCount,
      documentCount: documentCount,
      accessCount: accessCount,
      nationalityCount: nationalityCount,
      documentAccessCount: documentAccessCount
    };

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
