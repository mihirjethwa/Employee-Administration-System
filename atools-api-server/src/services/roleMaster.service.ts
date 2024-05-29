import RoleMaster, { IRoleMaster } from "../models/RoleMaster";

export const createRoleMaster = async (data: any): Promise<IRoleMaster> => {
  const newRoleMaster = new RoleMaster({
    roleName: data.roleName,
    createdBy: data.employee.id,
  });

  return newRoleMaster;
};
