import EmployeeGeneral, { IEmployeeGeneral } from "../models/EmployeeGeneral";
var mongoose = require("mongoose");

export const createEmploeeGeneral = async (
  data: any
): Promise<IEmployeeGeneral> => {
  const newEmployeeGeneral = new EmployeeGeneral({
    store: data.store,
    role: data.role,
    employeeId: data.employeeId,
    title: data.title,
    userName: data.userName,
    firstName: data.firstName,
    middleName: data.middleName,
    lastName: data.lastName,
    dateOfBirth: data.DOB,
    gender: data.gender,
    email: data.email,
    maritialStatus: data.maritialStatus,
    employeeNumber: data.employeeNumber,
    phoneNumber: data.phoneNumber,
    workNumber: data.workNumber,
    mobileNumber: data.mobileNumber,
    addressLine1: data.addressLine1,
    addressLine2: data.addressLine2,
    postCode: data.postCode,
    emergencyContactName: data.emergencyContactName,
    emergencyContactRelationship: data.emergencyContactRelationship,
    emergencyContactNumber: data.emergencyContactNumber,
    startDate: data.startDate,
    createdBy: data.employee.id,
  });

  return newEmployeeGeneral;
};
