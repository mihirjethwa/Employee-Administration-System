import EmployeeStore, { IEmployeeStore } from "../models/EmployeeStore";
var mongoose = require("mongoose");

export const createEmployeeStore = async (data: any): Promise<IEmployeeStore> => {
  const newEmployeeStore = new EmployeeStore({
    storeId: data.storeId,
    employeeId: mongoose.Types.ObjectId(),
    pageStatus: data.pageStatus,
    formStatus: data.formStatus,
    createdBy: data.employee.id,
    ...data,
  });

  return newEmployeeStore;
};
