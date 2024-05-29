import flatten from "flat";
import { Request, Response } from "express";
import Employee, { IEmployee } from "../models/Employee";
import { ApiResponse } from "../models/ApiResponse";
import { ExcelService } from "../services/excel.service";
import { ReportService } from "../services/report.service";

export const exportEmployeeBasicInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    // Getting data from the mongo in json object format
    // const employees = await Employee.find({}).lean().exec();
    const reportService = new ReportService();

    const employees = await reportService.getEmployeeReportData();
    console.log(employees);

    // Preparing columns
    const columns = [
      { header: "Store", key: "storeMaster.storeName" },
      { header: "Employee No", key: "_id" },
      { header: "Forename", key: "employeeGeneral.firstName" },
      { header: "Surname", key: "employeeGeneral.lastName" },
      { header: "Date of Birth", key: "birthDate" },
      { header: "Age", key: "age" },
      { header: "Gender", key: "employeeGeneral.gender" },
      { header: "Job Title", key: "roleMaster.roleName" },
      { header: "Nationality", key: "employeeRight.nationalityName" },
      { header: "NI Number", key: "employeePayroll.niNumber" },
      { header: "Pay Rate", key: "employeePayroll.payRate" },
      { header: "Pay Frequency", key: "employeePayroll.payRatePer" },
      { header: "Email", key: "email" },
      { header: "Phone", key: "employeeGeneral.phoneNumber" },
      { header: "Mobile", key: "employeeGeneral.mobileNumber" },
      { header: "Address Line 1", key: "employeeGeneral.addressLine1" },
      { header: "Address Line 2", key: "employeeGeneral.addressLine2" },
      { header: "Postcode", key: "employeeGeneral.postCode" },
      { header: "Start Date", key: "startDate" },
      { header: "Status", key: "employeeStatus.status" },
      { header: "Status Approved", key: "tatus Approved" },
      { header: "Status Approved By", key: "status approved by" },
    ];

    // Initializing excel service object and passing the data.
    const excelSevice = new ExcelService();
    excelSevice.createExcel("Employees", columns, employees);

    // Setting up content type to excel (xlsx).
    res.set({ "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    //Setting up filename
    res.set({ "Content-disposition": `attachment; filename=user-basic-info.xlsx` });

    // Export the document and sending it as the response.
    await excelSevice.export(res);
  } catch (error) {
    const response = new ApiResponse();
    if (error.isJoi) {
      response.status = { code: 422, message: error.message };
      res.status(422).send(response);
      return;
    }
    console.log(error);
    response.status = { code: 500, message: "Server Error" };
    res.status(500).send(response);
  }
};

export const niiAuditReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const reportService = new ReportService();
    const employees = await reportService.getNiNumberReportData();

    // Preparing columns
    const columns = [
      { header: "ID", key: "_id" },
      { header: "Store", key: "storeMaster.storeName" },
      { header: "First Name", key: "firstName" },
      { header: "Last Name", key: "lastName" },
      { header: "Date of Birth", key: "employeeGeneral.dateOfBirth" },
      { header: "NI Number", key: "employeePayroll.niNumber" },
      { header: "Job Title", key: "roleMaster.roleName" },
      { header: "Status", key: "empStatus" },
    ];

    // Initializing excel service object and passing the data.
    const excelSevice = new ExcelService();
    excelSevice.createExcel("Employees", columns, employees);

    // Setting up content type to excel (xlsx).
    res.set({ "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    //Setting up filename
    res.set({ "Content-disposition": `attachment; filename=ni-number-audit.xlsx` });

    // Export the document and sending it as the response.
    await excelSevice.export(res);
  } catch (error) {
    const response = new ApiResponse();
    if (error.isJoi) {
      response.status = { code: 422, message: error.message };
      res.status(422).send(response);
      return;
    }
    console.log(error);
    response.status = { code: 500, message: "Server Error" };
    res.status(500).send(response);
  }
};

export const exportEmailAudit = async (req: Request, res: Response): Promise<void> => {
  try {
    const reportService = new ReportService();
    const employees = await reportService.emailAuditData();

    // Preparing columns
    const columns = [
      { header: "ID", key: "_id" },
      { header: "Store", key: "storeMaster.storeName" },
      { header: "First Name", key: "firstName" },
      { header: "Last Name", key: "lastName" },
      { header: "Date of Birth", key: "employeeGeneral.dateOfBirth" },
      { header: "Job Title", key: "roleMaster.roleName" },
      { header: "Email", key: "email" },
      { header: "Status", key: "employeeStatus.status" },
    ];

    // Initializing excel service object and passing the data.
    const excelSevice = new ExcelService();
    excelSevice.createExcel("Employees", columns, employees);

    // Setting up content type to excel (xlsx).
    res.set({ "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    //Setting up filename
    res.set({ "Content-disposition": `attachment; filename=Email-Audit.xlsx` });

    // Export the document and sending it as the response.
    await excelSevice.export(res);
  } catch (error) {
    const response = new ApiResponse();
    if (error.isJoi) {
      response.status = { code: 422, message: error.message };
      res.status(422).send(response);
      return;
    }
    console.log(error);
    response.status = { code: 500, message: "Server Error" };
    res.status(500).send(response);
  }
};

export const emailAuditReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const reportService = new ReportService();
    const employees = await reportService.getNiNumberReportData();

    // Preparing columns
    const columns = [
      { header: "Payroll No", key: "employeePayroll._id" },
      { header: "ID", key: "employeeId" },
      { header: "Store", key: "storeMaster.storeName" },
      { header: "First Name", key: "firstName" },
      { header: "Last Name", key: "lastName" },
      { header: "Date of Birth", key: "dateOfBirth" },
      { header: "Job Title", key: "roleMaster.roleName" },
      { header: "Email", key: "email" },
      { header: "Status", key: "employeeStatus.status" },
    ];

    // Initializing excel service object and passing the data.
    const excelSevice = new ExcelService();
    excelSevice.createExcel("Employees", columns, employees);

    // Setting up content type to excel (xlsx).
    res.set({ "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    //Setting up filename
    res.set({ "Content-disposition": `attachment; filename=email-audit.xlsx` });

    // Export the document and sending it as the response.
    console.log(employees);
    await excelSevice.export(res);
  } catch (error) {}
};

export const exportStartersLeavers = async (req: Request, res: Response): Promise<void> => {
  try {
    // Getting data from the mongo in json object format
    // const employees = await Employee.find({}).lean().exec();
    const reportService = new ReportService();

    const starters = await reportService.getStartersReportData2();

    // Preparing columns
    const columns = [
      { header: "Store", key: "storeMaster.storeName" },
      { header: "Employee No", key: "employeeId" },
      { header: "Forename", key: "firstName" },
      { header: "Surname", key: "lastName" },
      { header: "Date of Birth", key: "dateOfBirth" },
      { header: "Gender", key: "gender" },
      { header: "Job Title", key: "roleMaster.roleName" },
      { header: "Nationality", key: "rightToWorkDetails.nationalityName" },
      { header: "NI Number", key: "employeePayroll.niNumber" },
      { header: "Pay Rate", key: "employeePayroll.payRate" },
      { header: "Pay Frequency", key: "employeePayroll.payRatePer" },
      { header: "Email", key: "email" },
      { header: "Phone", key: "phone" },
      { header: "Mobile", key: "generalDetails.mobileNumber" },
      { header: "Address Line 1", key: "addressLine1" },
      { header: "Address Line 2", key: "addressLine2" },
      { header: "Postcode", key: "postCode" },
      { header: "Status", key: "status" },
      { header: "Leave Date", key: "leaveDateKey" },
    ];

    // Initializing excel service object and passing the data.
    const excelSevice = new ExcelService();
    excelSevice.createExcel("Employees", columns, starters);

    // Setting up content type to excel (xlsx).
    res.set({ "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    //Setting up filename
    res.set({ "Content-disposition": `attachment; filename=Starters-Leavers.xlsx` });

    // Export the document and sending it as the response.
    await excelSevice.export(res);
  } catch (error) {
    const response = new ApiResponse();
    if (error.isJoi) {
      response.status = { code: 422, message: error.message };
      res.status(422).send(response);
      return;
    }
    console.log(error);
    response.status = { code: 500, message: "Server Error" };
    res.status(500).send(response);
  }
};

export const exportContractAmends = async (req: Request, res: Response): Promise<void> => {
  try {
    // Getting data from the mongo in json object format
    // const employees = await Employee.find({}).lean().exec();
    const reportService = new ReportService();

    const contact = await reportService.getContractAmendsData();

    // Preparing columns
    const columns = [
      { header: "DOMFD Employee ID", key: "employeeGeneral.employeeNumber" },
      { header: "Payroll No", key: "employeePayroll._id" },
      { header: "Store", key: "storeMaster.storeName" },
      { header: "Employee No", key: "_id" },
      { header: "Forename", key: "employeeGeneral.firstName" },
      { header: "Surname", key: "employeeGeneral.lastName" },
      { header: "Date of Birth", key: "birthDate" },
      { header: "Gender", key: "employeeGeneral.gender" },
      { header: "Age", key: "age" },
      { header: "Job Title", key: "roleMaster.roleName" },
      { header: "Nationality", key: "employeeRight.nationalityName" },
      { header: "NI Number", key: "employeePayroll.niNumber" },
      { header: "Pay Rate", key: "employeePayroll.payRate" },
      { header: "Frequency", key: "employeePayroll.payRatePer" },
      { header: "Email", key: "email" },
      { header: "Phone", key: "employeeGeneral.phoneNumber" },
      { header: "Mobile", key: "employeeGeneral.mobileNumber" },
      { header: "Address Line 1", key: "employeeGeneral.addressLine1" },
      { header: "Address Line 2", key: "employeeGeneral.addressLine2" },
      { header: "Postcode", key: "employeeGeneral.postCode" },
      { header: "Contract Amendment", key: "employeeContract.documents.0.fileName" },
      { header: "Expiry Date", key: "employeeContract.documents.0.expiryDate" },
      { header: "Verified", key: "employeeContract.0.documents.0.verified" },
      { header: "Verified Date", key: "employeeContract.documents.0.uploadedOn" },
    ];

    // console.log(contact);

    // Initializing excel service object and passing the data.
    const excelSevice = new ExcelService();
    excelSevice.createExcel("Employees", columns, contact);

    // Setting up content type to excel (xlsx).
    res.set({ "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    //Setting up filename
    res.set({ "Content-disposition": `attachment; filename=Contracts-Amends.xlsx` });

    // Export the document and sending it as the response.
    await excelSevice.export(res);
  } catch (error) {
    const response = new ApiResponse();
    if (error.isJoi) {
      response.status = { code: 422, message: error.message };
      res.status(422).send(response);
      return;
    }
    console.log(error);
    response.status = { code: 500, message: "Server Error" };
    res.status(500).send(response);
  }
};

export const exportRight = async (req: Request, res: Response): Promise<void> => {
  try {
    // Getting data from the mongo in json object format
    // const employees = await Employee.find({}).lean().exec();
    const reportService = new ReportService();

    const right = await reportService.getRightData();
    console.log(right);
    // Preparing columns
    const columns = [
      { header: "Store", key: "storeMaster.storeName" },
      { header: "Area Manager", key: "areaManager" },
      { header: "Forename", key: "firstName" },
      { header: "Surname", key: "lastName" },
      { header: "Date of Birth", key: "dateOfBirth" },
      { header: "Job Title", key: "roleMaster.roleName" },
      { header: "Nationality", key: "rightToWorkDetails.nationalityName" },
      { header: "Address Line 1", key: "addressLine1" },
      { header: "Address Line 2", key: "addressLine2" },
      { header: "Postcode", key: "postCode" },
      { header: "NI Number", key: "employeePayroll.niNumber" },
      { header: "Pay Rate", key: "employeePayroll.payRate" },
      { header: "Document", key: "rightToWorkDetails.documentType" },
      { header: "Expiry Date", key: "rightToWorkDetails.expiryDate" },
      { header: "Verified", key: "rightToWorkDetails.employee.userName" },
      { header: "ECS Expiry", key: "Ecs" },
    ];

    // Initializing excel service object and passing the data.
    const excelSevice = new ExcelService();
    excelSevice.createExcel("Employees", columns, right);

    // Setting up content type to excel (xlsx).
    res.set({ "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    //Setting up filename
    res.set({ "Content-disposition": `attachment; filename=Right-To-Work.xlsx` });

    // Export the document and sending it as the response.
    await excelSevice.export(res);
  } catch (error) {
    const response = new ApiResponse();
    if (error.isJoi) {
      response.status = { code: 422, message: error.message };
      res.status(422).send(response);
      return;
    }
    console.log(error);
    response.status = { code: 500, message: "Server Error" };
    res.status(500).send(response);
  }
};

export const exportJob = async (req: Request, res: Response): Promise<void> => {
  try {
    // Getting data from the mongo in json object format
    // const employees = await Employee.find({}).lean().exec();
    const reportService = new ReportService();

    const job = await reportService.getJobData();

    // Preparing columns
    const columns = [
      { header: "Store", key: "storeMaster.storeName" },
      { header: "Forename", key: "firstName" },
      { header: "Surname", key: "lastName" },
      { header: "Date of Birth", key: "dateOfBirth" },
      { header: "Job Title", key: "roleMaster.roleName" },
      { header: "Email", key: "email" },
      { header: "Address Line 1", key: "addressLine1" },
      { header: "NI Number", key: "employeePayroll.niNumber" },
      { header: "Address Line 2", key: "addressLine2" },
      { header: "Pay Rate", key: "employeePayroll.payRate" },
      { header: "Postcode", key: "postCode" },
      { header: "Document", key: "employeeDocs.documents.0.documentName" },
      { header: "Custom Naem", key: "customName" },
      { header: "Document Name", key: "employeeDocs.documents.0.fileName" },
      { header: "Expiry Date", key: "employeeDocs.documents.0.expiryDate" },
      { header: "Verified", key: "employeeDocs.employee.userName" },
      { header: "Document Comment", key: "Ecs" },
    ];

    // Initializing excel service object and passing the data.
    const excelSevice = new ExcelService();
    excelSevice.createExcel("Employees", columns, job);

    // Setting up content type to excel (xlsx).
    res.set({ "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    //Setting up filename
    res.set({ "Content-disposition": `attachment; filename=Job-Documents.xlsx` });

    // Export the document and sending it as the response.
    await excelSevice.export(res);
  } catch (error) {
    const response = new ApiResponse();
    if (error.isJoi) {
      response.status = { code: 422, message: error.message };
      res.status(422).send(response);
      return;
    }
    console.log(error);
    response.status = { code: 500, message: "Server Error" };
    res.status(500).send(response);
  }
};

export const exportUserName = async (req: Request, res: Response): Promise<void> => {
  try {
    // Getting data from the mongo in json object format
    // const employees = await Employee.find({}).lean().exec();
    const reportService = new ReportService();

    const userName = await reportService.getUsersData();
    // Preparing columns
    const columns = [
      { header: "Store", key: "storeMaster.storeName" },
      { header: "Employee No", key: "employeeId" },
      { header: "Payroll No", key: "employeePayroll._id" },
      { header: "First Name", key: "firstName" },
      { header: "Last Name", key: "lastName" },
      { header: "Job Title", key: "roleMaster.roleName" },
      { header: "Username", key: "userName" },
      { header: "2FA Enabled", key: "2FA" },
    ];

    // Initializing excel service object and passing the data.
    const excelSevice = new ExcelService();
    excelSevice.createExcel("Employees", columns, userName);

    // Setting up content type to excel (xlsx).
    res.set({ "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    //Setting up filename
    res.set({ "Content-disposition": `attachment; filename=Usernames.xlsx` });

    // Export the document and sending it as the response.
    await excelSevice.export(res);
  } catch (error) {
    const response = new ApiResponse();
    if (error.isJoi) {
      response.status = { code: 422, message: error.message };
      res.status(422).send(response);
      return;
    }
    console.log(error);
    response.status = { code: 500, message: "Server Error" };
    res.status(500).send(response);
  }
};
