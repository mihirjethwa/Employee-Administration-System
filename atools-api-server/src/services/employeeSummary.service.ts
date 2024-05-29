/* eslint-disable @typescript-eslint/no-empty-function */
import Employee from "../models/Employee";
const mongoose = require("mongoose");

export class Summary {
  constructor() {}

  public async getEmployeeSummary(id: any): Promise<any> {
    const employee = await Employee.aggregate([
      {
        $lookup: {
          from: "storeMaster",
          localField: "store",
          foreignField: "_id",
          as: "store",
        },
      },
      {
        $lookup: {
          from: "roleMaster",
          localField: "role",
          foreignField: "_id",
          as: "role",
        },
      },
      {
        $lookup: {
          from: "employeeGeneral",
          localField: "_id",
          foreignField: "employeeId",
          as: "generalDetails",
        },
      },
      {
        $lookup: {
          from: "employeePayroll",
          localField: "_id",
          foreignField: "employeeId",
          as: "payrollDetails",
        },
      },
      {
        $lookup: {
          from: "employeeRight",
          localField: "_id",
          foreignField: "employeeId",
          as: "rightToWorkDetails",
        },
      },
      {
        $lookup: {
          from: "employeeDocs",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeDocs",
        },
      },
      { $match: { _id: mongoose.Types.ObjectId(id) } },
      { $unwind: "$payrollDetails" },
      { $unwind: "$generalDetails" },
      { $unwind: "$rightToWorkDetails" },
      { $unwind: "$employeeDocs" },
      { $unwind: "$store" },
      { $unwind: "$role" },
      {
        $project: {
          _id: { $toString: "$_id" },
          firstName: 1,
          lastName: 1,
          email: 1,
          dateOfBirth: 1,
          empStatus: 1,
          generalDetails: 1,
          rightToWorkDetails: 1,
          startDate: 1,
          employeeDocs: 1,
          "payrollDetails.payRate": 1,
          "payrollDetails.payRatePer": 1,
          "payrollDetails.niNumber": 1,
          "payrollDetails.payeForm": 1,
          "payrollDetails.sortCode": 1,
          "payrollDetails.accountName": 1,
          "payrollDetails.accountNumber": 1,
          "payrollDetails.accountRefrence": 1,
          "payrollDetails.documents": 1,
          "store.storeName": 1,
          "role.roleName": 1,
        },
      },
    ]).exec();

    return employee[0];
  }
}
