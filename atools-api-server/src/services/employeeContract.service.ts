import EmployeeContract, { IEmployeeContract } from "../models/EmployeeContract";

export const createEmployeeContract = async (data: any): Promise<IEmployeeContract> => {
  const newEmployeeContract = new EmployeeContract({
    employeeId: data.employeeId,
    contractUploaded: data.contractUploaded,
  waitingAmendment:data.waitingAmendment,
  createdBy: data.employee.id,
    ...data,
  });

  return newEmployeeContract;
};
