import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IEmployeePayslip extends Document {
  employeeId: Types.ObjectId | Record<string, unknown>;
  startDate: Date;
  endDate: Date;
  totalHours: number;
  totalDays: number;
  netPay: number;
  transferStatus: Boolean;
  payslipDoc: Object;
  createdAt: Date;
  updatedAt: Date;
  createdBy: Types.ObjectId | Record<string, unknown>;
}

const EmployeePayslipSchema = new Schema<IEmployeePayslip>({
  employeeId: { type: Schema.Types.ObjectId, ref: "Employee" },
  startDate: { type: Date },
  endDate: { type: Date },
  totalHours: { type: Number },
  totalDays: { type: Number },
  netPay: { type: Number },
  transferStatus: { type: Boolean },
  payslipDoc: { type: Object },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  createdBy: { type: Schema.Types.ObjectId, ref: "Employee" },
});

// Export the model and return your IUser interface
export default mongoose.model<IEmployeePayslip>("EmployeePayslip", EmployeePayslipSchema, "employeePayslip");
