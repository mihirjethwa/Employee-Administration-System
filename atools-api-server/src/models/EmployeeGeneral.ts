import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IEmployeeGeneral extends Document {
  store: Types.ObjectId | Record<string, unknown>;
  role: Types.ObjectId | Record<string, unknown>;
  employeeId: string;
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  DOB: Date;
  maritialStatus: string;
  userName: string;
  employeeNumber: string;
  dateOfBirth: Date;
  gender: string;
  email: string;
  phoneNumber: string;
  workNumber: string;
  mobileNumber: string;
  addressLine1: string;
  addressLine2: string;
  postCode: string;
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactNumber: number;
  startDate: string;
  createdAt: Date;
  updatedAt: Date;
  employee: any;
  createdBy: Types.ObjectId | Record<string, unknown>;
}

const EmployeeGeneralSchema = new Schema<IEmployeeGeneral>({
  store: { type: Schema.Types.ObjectId, ref: "StoreMaster" },
  role: { type: Schema.Types.ObjectId, ref: "RoleMaster" },
  title: { type: String, required: true },
  employeeId: { type: Schema.Types.ObjectId, ref: "Employee" },
  firstName: { type: String },
  middleName: { type: String },
  lastName: { type: String },
  DOB: { type: Date },
  maritialStatus: { type: String },
  userName: { type: String },
  employeeNumber: { type: String },
  dateOfBirth: { type: Date },
  gender: { type: String },
  phoneNumber: { type: String },
  workNumber: { type: String },
  mobileNumber: { type: String },
  addressLine1: { type: String },
  addressLine2: { type: String },
  email: { type: String },
  postCode: { type: String  },
  emergencyContactName: { type: String },
  emergencyContactRelationship: { type: String },
  emergencyContactNumber: { type: String },
  startDate: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  createdBy: { type: Schema.Types.ObjectId, ref: "Employee" },
  employee:{ type: Object}
});

// Export the model and return your IUser interface
export default mongoose.model<IEmployeeGeneral>("EmployeeGeneral", EmployeeGeneralSchema, "employeeGeneral");
