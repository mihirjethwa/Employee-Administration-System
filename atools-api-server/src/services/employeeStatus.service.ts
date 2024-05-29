import EmployeeStatus, { IEmployeeStatus } from "../models/EmployeeStatus";

export const createEmployeeStatus = async (data: any): Promise<IEmployeeStatus> => {
  const newEmployeeStatus = new EmployeeStatus({
    employeeId: data.employeeId,
    status: data.status,
    leaveDate: data.leaveDate,
    leaveReason: data.leaveReason,
    addressLine1: data.addressLine1,
    addressLine2: data.addressLine2,
    addressLine3: data.addressLine3,
    postCode: data.postCode,
    rotaStore: data.rotaStore,
    resignationDocument: data.resignationDocument,
    createdBy: data.employee.id,
  });

  return newEmployeeStatus;
};

export const createEmployeeStatus2 = async (data: any): Promise<any> => {
  const newEmployeeStatus = new EmployeeStatus({
    employeeId: data.employeeId,
    status: data.status,
    createdBy: data.createdBy,
  });

  return newEmployeeStatus;
};
