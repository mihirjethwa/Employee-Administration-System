import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IEmployeeStatus extends Document {
  employeeId: string;
  // rotaStore: Types.ObjectId | Record<string, unknown>;
  rotaStore: String;
  leaveDate: Date;
  leaveReason: String;
  addressLine1: String;
  addressLine2: String;
  addressLine3: String;
  resignationDocument: String;
  postCode: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: Types.ObjectId | Record<string, unknown>;
}

const EmployeeStatusSchema = new Schema<IEmployeeStatus>({
  employeeId: { type: Schema.Types.ObjectId, ref: "Employee" },
  // rotaStore: { type: Schema.Types.ObjectId, ref: "Store" },
  rotaStore: { type: String },
  status: { type: String },
  leaveDate: { type: Date },
  leaveReason: { type: String },
  addressLine1: { type: String },
  addressLine2: { type: String },
  addressLine3: { type: String },
  resignationDocument: { type: String },
  postCode: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  createdBy: { type: Schema.Types.ObjectId, ref: "Employee" },
});

// Export the model and return your IUser interface
export default mongoose.model<IEmployeeStatus>("EmployeeStatus", EmployeeStatusSchema, "employeeStatus");
