import EmployeePayslip, { IEmployeePayslip } from "../models/EmployeePayslip";

export const createEmployeePayslip = async (data: any): Promise<IEmployeePayslip> => {
  const newEmployeePayslip = new EmployeePayslip({
    employeeId: data.employeeId,
    startDate: data.startDate,
    endDate: data.endDate,
    totalHours: data.totalHours,
    totalDays: data.totalDays,
    payslipDoc: data.payslipDoc,
    netPay: data.netPay,
    transferStatus: data.transferStatus,
    createdBy: data.employee.id,
  });

  return newEmployeePayslip;
};
