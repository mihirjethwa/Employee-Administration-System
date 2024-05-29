import DocumentMaster, { IDocumentMaster } from "../models/DocumentMaster";

export const createDocumentMaster = async (data: any): Promise<IDocumentMaster> => {
  const newDocumentMaster = new DocumentMaster({
    role: data.role,
    documentName: data.documentName,
    required: data.required,
    createdBy: data.employee.id,
  });

  return newDocumentMaster;
};
