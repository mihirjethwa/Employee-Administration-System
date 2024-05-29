import EmployeePayroll, { IEmployeePayroll } from "../models/EmployeePayroll";

export const createEmployeePayroll = async (data: any): Promise<IEmployeePayroll> => {
  const newEmployeePayroll = new EmployeePayroll({
    employeeId: data.employeeId,
    role: data.role,
    contract: data.contract,
    payRateRule: data.payRateRule,
    payRatePer: data.payRatePer,
    payRate: data.payRate,
    holidayRule: data.holidayRule,
    paymentMethod: data.paymentMethod,
    routingNumber: data.routingNumber,
    accountNumber: data.accountNumber,
    bankName: data.bankName,
    accountRefrence: data.accountRefrence,
    bankPaymentMethod: data.bankPaymentMethod,
    bankSortCode: data.bankSortCode,
    bankDocumentVerified: data.bankDocumentVerified,
    bankAccountName: data.bankAccountName,
    bankAccountRefrence: data.bankAccountRefrence,
    // createdBy: data.employee.id,
    ...data,
  });

  return newEmployeePayroll;
};
