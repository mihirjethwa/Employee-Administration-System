import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IEmployeePayroll extends Document {
  employeeId: Types.ObjectId | Record<string, unknown>;
  role: string;
  contract: string;
  payRateRule: string;
  payRatePer: string;
  payRate: number;
  holidayRule: string;
  paymentMethod: string;
  routingNumber: string;
  accountNumber: string;
  bankName: string;
  payMethod: string;
  accountRefrence: string;
  bankPaymentMethod: string;
  bankSortCode: string;
  bankDocumentVerified: boolean;
  bankAccountName: string;
  bankAccountRefrence: string;
  documents: any;
  createdAt: Date;
  updatedAt: Date;
  createdBy: Types.ObjectId | Record<string, unknown>;
}

const EmployeePayrollSchema = new Schema<IEmployeePayroll>(
  {
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee" },
    role: { type: String },
    contract: { type: String },
    payRateRule: { type: String },
    payRatePer: { type: String },
    payRate: { type: Number },
    holidayRule: { type: String },
    paymentMethod: { type: String },
    routingNumber: { type: String },
    accountNumber: { type: String },
    accountName: { type: String },
    bankName: { type: String },
    accountRefrence: { type: String },
    bankPaymentMethod: { type: String },
    bankSortCode: { type: String },
    bankDocumentVerified: { type: Boolean },
    bankAccountName: { type: String },
    bankAccountRefrence: { type: String },
    documents: { type: Schema.Types.Array },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    createdBy: { type: Schema.Types.ObjectId, ref: "Employee" },
  },
  { strict: false }
);

// Export the model and return your IUser interface
export default mongoose.model<IEmployeePayroll>("EmployeePayroll", EmployeePayrollSchema, "employeePayroll");
