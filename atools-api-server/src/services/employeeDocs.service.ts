import EmployeeDocs, { IEmployeeDocs } from "../models/EmployeeDocs";

export const createEmploeeDocs = async (data: any): Promise<IEmployeeDocs> => {
  const newEmployeeDocs = new EmployeeDocs({
    employeeId: data.employeeId,
    fileRequired: data.fileName,
    successfullyUploded: data.successfullyUploded,
    documentVerified: data.documentVerified,
    verifiedBy: data.employee.id,
    verifiedDate: data.verifiedDate,
    additionalDocuments: data.additioalDocuments,
    createdBy: data.employee.id,
    ...data,
  });

  return newEmployeeDocs;
};

export const createArray = (data: any) => {
  const docs = data.documents;
  let result = docs.map(({ fileName, s3Path }: any) => ({ name: fileName, key: s3Path }));
  return result;
};
