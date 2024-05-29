import EmployeeRight, { IEmployeeRight } from "../models/EmployeeRight";

export const createEmploeeRight = async (data: any): Promise<IEmployeeRight> => {
  const newEmployeeRight = new EmployeeRight({
    employeeId: data.employeeId,
    nationality: data.nationality,
    nationalityName: data.nationalityName,
    documents: data.documents,
    fileName: data.fileName,
    successfullyUploded: data.successfullyUploded,
    documentVerified: data.documentVerified,
    verifiedBy: data.employee.id,
    verifiedDate: data.verifiedDate,
    question1: data.question1,
    question2: data.question2,
    question3: data.question3,
    fullName: data.fullName,
    date: data.date,
    createdBy: data.employee.id,
    ...data,
  });

  return newEmployeeRight;
};
