import EmployeeGeneral from "../models/EmployeeGeneral";
import Employee from "../models/Employee";

import EmployeeSummaryView from "../models/EmployeeSummary";

import flatten from "flat";

export class ReportService {
  constructor() {}

  convertDate(inputFormat: any) {
    function pad(s: any) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("-");
  }
  getAge = (d: Date) => {
    const d2 = new Date();
    var diff = d2.getTime() - d.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  };

  public async getNiNumberReportData(): Promise<any> {
    let employees = await Employee.aggregate([
      {
        $lookup: {
          from: "employeePayroll",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeePayroll",
        },
      },
      {
        $lookup: {
          from: "employeeGeneral",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeGeneral",
        },
      },
      {
        $lookup: {
          from: "employeeStatus",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeStatus",
        },
      },
      {
        $lookup: {
          from: "storeMaster",
          localField: "store",
          foreignField: "_id",
          as: "storeMaster",
        },
      },
      {
        $lookup: {
          from: "roleMaster",
          localField: "role",
          foreignField: "_id",
          as: "roleMaster",
        },
      },
      { $unwind: { path: "$employeePayroll", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$employeeGeneral", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$employeeStatus", preserveNullAndEmptyArrays: true } },
      { $unwind: "$storeMaster" },
      { $unwind: "$roleMaster" },
      {
        $project: {
          _id: { $toString: "$_id" },
          firstName: 1,
          lastName: 1,
          email: 1,
          dateOfBirth: 1,
          empStatus: 1,
          "storeMaster.storeName": 1,
          "storeMaster.storeLocation": 1,
          "roleMaster.roleName": 1,
          "employeePayroll._id": { $toString: "$employeePayroll._id" },
          "employeePayroll.niNumber": 1,
          "employeeStatus.status": 1,
          "employeeGeneral.dateOfBirth": 1,
        },
      },
    ]).exec();

    // Flatten nested keys into flat format
    employees = employees.map((row: any) => flatten(row));

    return employees;
  }

  public async emailAuditData(): Promise<any> {
    let employees = await Employee.aggregate([
      {
        $lookup: {
          from: "employeePayroll",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeePayroll",
        },
      },
      {
        $lookup: {
          from: "employeeGeneral",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeGeneral",
        },
      },
      {
        $lookup: {
          from: "employeeStatus",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeStatus",
        },
      },
      {
        $lookup: {
          from: "storeMaster",
          localField: "store",
          foreignField: "_id",
          as: "storeMaster",
        },
      },
      {
        $lookup: {
          from: "roleMaster",
          localField: "role",
          foreignField: "_id",
          as: "roleMaster",
        },
      },
      { $unwind: { path: "$employeePayroll", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$employeeGeneral", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$employeeStatus", preserveNullAndEmptyArrays: true } },
      { $unwind: "$storeMaster" },
      { $unwind: "$roleMaster" },
      {
        $project: {
          _id: { $toString: "$_id" },
          firstName: 1,
          lastName: 1,
          email: 1,
          dateOfBirth: 1,
          empStatus: 1,
          "storeMaster.storeName": 1,
          "storeMaster.storeLocation": 1,
          "roleMaster.roleName": 1,
          "employeePayroll._id": { $toString: "$employeePayroll._id" },
          "employeePayroll.niNumber": 1,
          "employeeStatus.status": 1,
          "employeeGeneral.dateOfBirth": 1,
        },
      },
    ]).exec();

    // Flatten nested keys into flat format
    employees = employees.map((row: any) => flatten(row));

    return employees;
  }

  public async getEmployeeReportData(): Promise<any> {
    let employees = await Employee.aggregate([
      {
        $lookup: {
          from: "employeePayroll",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeePayroll",
        },
      },
      {
        $lookup: {
          from: "employeeStatus",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeStatus",
        },
      },
      {
        $lookup: {
          from: "employeeGeneral",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeGeneral",
        },
      },
      {
        $lookup: {
          from: "employeeRight",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeRight",
        },
      },
      {
        $lookup: {
          from: "storeMaster",
          localField: "store",
          foreignField: "_id",
          as: "storeMaster",
        },
      },
      {
        $lookup: {
          from: "roleMaster",
          localField: "role",
          foreignField: "_id",
          as: "roleMaster",
        },
      },
      { $unwind: { path: "$employeePayroll", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$employeeStatus", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$employeeGeneral", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$employeeRight", preserveNullAndEmptyArrays: true } },

      { $unwind: "$storeMaster" },
      { $unwind: "$roleMaster" },
      {
        $project: {
          _id: { $toString: "$_id" },
          email: 1,
          dateOfBirth: 1,
          startDate: 1,
          "storeMaster.storeName": 1,
          "storeMaster.storeLocation": 1,
          "roleMaster.roleName": 1,
          "employeePayroll._id": { $toString: "$employeePayroll._id" },
          "employeePayroll.niNumber": 1,
          "employeePayroll.payRate": 1,
          "employeePayroll.payRatePer": 1,
          "employeeStatus.status": 1,
          "employeeContract.documents": 1,
          "employeeGeneral.firstName": 1,
          "employeeGeneral.lastName": 1,
          "employeeGeneral.phoneNumber": 1,
          "employeeGeneral.mobileNumber": 1,
          "employeeGeneral.postCode": 1,
          "employeeGeneral.addressLine1": 1,
          "employeeGeneral.addressLine2": 1,
          "employeeGeneral.gender": 1,
          "employeeGeneral.dateOfBirth": 1,
          "employeeGeneral.employeeNumber": 1,
          "employeeRight.nationalityName": 1,
        },
      },
    ]).exec();

    for (let employee of employees) {
      const dob = new Date(employee?.employeeGeneral?.dateOfBirth);
      employee.age = this.getAge(dob);
      employee.birthDate = this.convertDate(dob);
      employee.startDate = this.convertDate(new Date(employee?.startDate));
    }

    // Flatten nested keys into flat format
    employees = employees.map((row: any) => flatten(row));

    return employees;
  }

  public async getStartersReportData(): Promise<any> {
    let employees = await EmployeeGeneral.aggregate([
      {
        $lookup: {
          from: "employeePayroll",
          localField: "employeeId",
          foreignField: "employeeId",
          as: "employeePayroll",
        },
      },
      {
        $lookup: {
          from: "employee",
          localField: "employeeId",
          foreignField: "_id",
          as: "employee",
        },
      },
      {
        $lookup: {
          from: "employeeStatus",
          localField: "employeeId",
          foreignField: "employeeId",
          as: "employeeStatus",
        },
      },
      {
        $lookup: {
          from: "storeMaster",
          localField: "store",
          foreignField: "_id",
          as: "storeMaster",
        },
      },
      {
        $lookup: {
          from: "roleMaster",
          localField: "role",
          foreignField: "_id",
          as: "roleMaster",
        },
      },
      { $unwind: { path: "$employeePayroll", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$employeeGeneral", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$employeeStatus", preserveNullAndEmptyArrays: true } },
      { $unwind: "$storeMaster" },
      { $unwind: "$roleMaster" },
      {
        $project: {
          employeeId: { $toString: "$employeeId" },
          firstName: 1,
          lastName: 1,
          //   email: 1,
          //   dateOfBirth: 1,
          //   gender: 1,
          //   phone: 1,
          //   addressLine1: 1,
          //   addressLine2: 1,
          //   postCode: 1,
          //   status: 1,
          //   "employee.0.startDate": 1,
          //   "employee.0.mobile": 1,
          //   "employee.0.empStatus": 1,
          //   "storeMaster.storeName": 1,
          //   "storeMaster.storeLocation": 1,
          //   "rightToWorkDetails.nationalityName": 1,
          //   "roleMaster.roleName": 1,
          //   "employeePayroll._id": { $toString: "$employeePayroll._id" },
          //   "employeePayroll.niNumber": 1,
          //   "employeePayroll.payRate": 1,
          //   "employeePayroll.payRatePer": 1,
          //   "employeeStatus.status": 1,
          //   "generalDetails.mobileNumber": 1,
        },
      },
    ]).exec();

    // Flatten nested keys into flat format
    employees = employees.map((row: any) => flatten(row));

    return employees;
  }

  public async getStartersReportData2(): Promise<any> {
    let employees = await Employee.aggregate([
      {
        $lookup: {
          from: "employeePayroll",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeePayroll",
        },
      },
      {
        $lookup: {
          from: "employeeStatus",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeStatus",
        },
      },
      {
        $lookup: {
          from: "storeMaster",
          localField: "store",
          foreignField: "_id",
          as: "storeMaster",
        },
      },
      {
        $lookup: {
          from: "roleMaster",
          localField: "role",
          foreignField: "_id",
          as: "roleMaster",
        },
      },
      { $unwind: { path: "$employeePayroll", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$employeeGeneral", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$employeeStatus", preserveNullAndEmptyArrays: true } },
      { $unwind: "$storeMaster" },
      { $unwind: "$roleMaster" },
      {
        $project: {
          employeeId: { $toString: "$employeeId" },
          firstName: 1,
          lastName: 1,
          email: 1,
          dateOfBirth: 1,
          gender: 1,
          phone: 1,
          addressLine1: 1,
          addressLine2: 1,
          postCode: 1,
          status: 1,
          "employee.0.startDate": 1,
          "employee.0.mobile": 1,
          "employee.0.empStatus": 1,
          "storeMaster.storeName": 1,
          "storeMaster.storeLocation": 1,
          "rightToWorkDetails.nationalityName": 1,
          "roleMaster.roleName": 1,
          "employeePayroll._id": { $toString: "$employeePayroll._id" },
          "employeePayroll.niNumber": 1,
          "employeePayroll.payRate": 1,
          "employeePayroll.payRatePer": 1,
          "employeeStatus.status": 1,
          "generalDetails.mobileNumber": 1,
        },
      },
    ]).exec();

    // Flatten nested keys into flat format
    employees = employees.map((row: any) => flatten(row));

    return employees;
  }

  public async getContractAmendsData(): Promise<any> {
    let employees = await Employee.aggregate([
      {
        $lookup: {
          from: "employeePayroll",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeePayroll",
        },
      },
      {
        $lookup: {
          from: "employeeContract",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeContract",
        },
      },
      {
        $lookup: {
          from: "employeeStatus",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeStatus",
        },
      },
      {
        $lookup: {
          from: "employeeGeneral",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeGeneral",
        },
      },
      {
        $lookup: {
          from: "employeeRight",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeRight",
        },
      },
      {
        $lookup: {
          from: "storeMaster",
          localField: "store",
          foreignField: "_id",
          as: "storeMaster",
        },
      },
      {
        $lookup: {
          from: "roleMaster",
          localField: "role",
          foreignField: "_id",
          as: "roleMaster",
        },
      },
      { $unwind: { path: "$employeePayroll", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$employeeContract", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$employeeStatus", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$employeeGeneral", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$employeeRight", preserveNullAndEmptyArrays: true } },

      { $unwind: "$storeMaster" },
      { $unwind: "$roleMaster" },
      {
        $project: {
          _id: { $toString: "$_id" },
          email: 1,
          dateOfBirth: 1,
          startDate: 1,
          "storeMaster.storeName": 1,
          "storeMaster.storeLocation": 1,
          "roleMaster.roleName": 1,
          "employeePayroll._id": { $toString: "$employeePayroll._id" },
          "employeePayroll.niNumber": 1,
          "employeePayroll.payRate": 1,
          "employeePayroll.payRatePer": 1,
          "employeeStatus.status": 1,
          "employeeContract.documents": 1,
          "employeeGeneral.firstName": 1,
          "employeeGeneral.lastName": 1,
          "employeeGeneral.phoneNumber": 1,
          "employeeGeneral.mobileNumber": 1,
          "employeeGeneral.postCode": 1,
          "employeeGeneral.addressLine1": 1,
          "employeeGeneral.addressLine2": 1,
          "employeeGeneral.gender": 1,
          "employeeGeneral.dateOfBirth": 1,
          "employeeGeneral.employeeNumber": 1,
          "employeeRight.nationalityName": 1,
        },
      },
    ]).exec();

    for (let employee of employees) {
      const dob = new Date(employee?.employeeGeneral?.dateOfBirth);
      employee.age = this.getAge(dob);
      employee.birthDate = this.convertDate(dob);
    }

    // Flatten nested keys into flat format
    employees = employees.map((row: any) => flatten(row));

    return employees;
  }

  public async getRightData(): Promise<any> {
    let employees = await EmployeeSummaryView.aggregate([
      {
        $lookup: {
          from: "employeePayroll",
          localField: "employeeId",
          foreignField: "employeeId",
          as: "employeePayroll",
        },
      },
      {
        $lookup: {
          from: "employeeContract",
          localField: "employeeId",
          foreignField: "employeeId",
          as: "employeeContract",
        },
      },
      {
        $lookup: {
          from: "employee",
          localField: "employeeId",
          foreignField: "_id",
          as: "employee",
        },
      },
      {
        $lookup: {
          from: "employeeStatus",
          localField: "employeeId",
          foreignField: "employeeId",
          as: "employeeStatus",
        },
      },
      {
        $lookup: {
          from: "storeMaster",
          localField: "store",
          foreignField: "_id",
          as: "storeMaster",
        },
      },
      {
        $lookup: {
          from: "roleMaster",
          localField: "role",
          foreignField: "_id",
          as: "roleMaster",
        },
      },
      { $unwind: { path: "$employeePayroll", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$employeeGeneral", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$employeeStatus", preserveNullAndEmptyArrays: true } },
      { $unwind: "$storeMaster" },
      { $unwind: "$roleMaster" },
      {
        $project: {
          employeeId: { $toString: "$employeeId" },
          firstName: 1,
          lastName: 1,
          email: 1,
          dateOfBirth: 1,
          gender: 1,
          phone: 1,
          addressLine1: 1,
          addressLine2: 1,
          postCode: 1,
          status: 1,
          "employee.0.startDate": 1,
          "employee.0.mobile": 1,
          "employee.0.empStatus": 1,
          "storeMaster.storeName": 1,
          "storeMaster.storeLocation": 1,
          "rightToWorkDetails.nationalityName": 1,
          "roleMaster.roleName": 1,
          "employeePayroll._id": { $toString: "$employeePayroll._id" },
          "employeePayroll.niNumber": 1,
          "employeePayroll.payRate": 1,
          "employeePayroll.payRatePer": 1,
          "employeeStatus.status": 1,
          "generalDetails.mobileNumber": 1,
          "rightToWorkDetails.documentType": 1,
          "rightToWorkDetails.expiryDate": 1,
          "rightToWorkDetails.employee.userName": 1,
        },
      },
    ]).exec();

    // Flatten nested keys into flat format
    employees = employees.map((row: any) => flatten(row));

    return employees;
  }

  public async getJobData(): Promise<any> {
    let employees = await EmployeeGeneral.aggregate([
      {
        $lookup: {
          from: "employeePayroll",
          localField: "employeeId",
          foreignField: "employeeId",
          as: "employeePayroll",
        },
      },
      {
        $lookup: {
          from: "employeeDocs",
          localField: "employeeId",
          foreignField: "employeeId",
          as: "employeeDocs",
        },
      },
      {
        $lookup: {
          from: "employeeContract",
          localField: "employeeId",
          foreignField: "employeeId",
          as: "employeeContract",
        },
      },
      {
        $lookup: {
          from: "employee",
          localField: "employeeId",
          foreignField: "_id",
          as: "employee",
        },
      },
      {
        $lookup: {
          from: "storeMaster",
          localField: "store",
          foreignField: "_id",
          as: "storeMaster",
        },
      },
      {
        $lookup: {
          from: "roleMaster",
          localField: "role",
          foreignField: "_id",
          as: "roleMaster",
        },
      },
      { $unwind: { path: "$employeePayroll", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$employeeDocs", preserveNullAndEmptyArrays: true } },
      { $unwind: "$employee" },
      { $unwind: "$storeMaster" },
      { $unwind: "$roleMaster" },
      {
        $project: {
          employeeId: { $toString: "$employeeId" },
          firstName: 1,
          lastName: 1,
          email: 1,
          dateOfBirth: 1,
          gender: 1,
          phone: 1,
          addressLine1: 1,
          addressLine2: 1,
          postCode: 1,
          status: 1,
          "employee.0.startDate": 1,
          "employee.0.mobile": 1,
          "employee.0.empStatus": 1,
          "storeMaster.storeName": 1,
          "storeMaster.storeLocation": 1,
          "roleMaster.roleName": 1,
          "employeePayroll._id": { $toString: "$employeePayroll._id" },
          "employeePayroll.niNumber": 1,
          "employeePayroll.payRate": 1,
          "employeePayroll.payRatePer": 1,
          employeeDocs: 1,
        },
      },
    ]).exec();

    // Flatten nested keys into flat format
    employees = employees.map((row: any) => flatten(row));

    return employees;
  }

  public async getUsersData(): Promise<any> {
    let employees = await EmployeeGeneral.aggregate([
      {
        $lookup: {
          from: "employeePayroll",
          localField: "employeeId",
          foreignField: "employeeId",
          as: "employeePayroll",
        },
      },
      {
        $lookup: {
          from: "employee",
          localField: "employeeId",
          foreignField: "_id",
          as: "employee",
        },
      },
      {
        $lookup: {
          from: "storeMaster",
          localField: "store",
          foreignField: "_id",
          as: "storeMaster",
        },
      },
      {
        $lookup: {
          from: "roleMaster",
          localField: "role",
          foreignField: "_id",
          as: "roleMaster",
        },
      },
      { $unwind: "$employeePayroll" },
      { $unwind: "$employee" },
      { $unwind: "$storeMaster" },
      { $unwind: "$roleMaster" },
      {
        $project: {
          employeeId: { $toString: "$employeeId" },
          firstName: 1,
          lastName: 1,
          email: 1,
          dateOfBirth: 1,
          gender: 1,
          phone: 1,
          addressLine1: 1,
          addressLine2: 1,
          postCode: 1,
          status: 1,
          userName: 1,
          "employee.0.startDate": 1,
          "employee.0.mobile": 1,
          "employee.0.empStatus": 1,
          "storeMaster.storeName": 1,
          "storeMaster.storeLocation": 1,
          "roleMaster.roleName": 1,
          "employeePayroll._id": { $toString: "$employeePayroll._id" },
        },
      },
    ]).exec();

    // Flatten nested keys into flat format
    employees = employees.map((row: any) => flatten(row));

    return employees;
  }
}
