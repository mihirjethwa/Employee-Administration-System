import AccessMaster, { IAccessMaster } from "../models/AccessMaster";

export const createAccessMaster = async (data: any): Promise<IAccessMaster> => {
  const newAccessMaster = new AccessMaster({
    role: data.role,
    modulesAccess: data.modulesAccess,
    createdBy: data.employee.id,
  });

  return newAccessMaster;
};
