import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IEmployeeStore extends Document {
  employeeId: string;
  storeId: Types.ObjectId | Record<string, unknown>;
  role: Types.ObjectId | Record<string, unknown>;
  pageStatus: Number;
  formStatus: String;
  startDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const EmployeeStoreSchema = new Schema<IEmployeeStore>(
  {
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee" },
    storeId: { type: Schema.Types.ObjectId, ref: "StoreMaster" },
    role: { type: Schema.Types.ObjectId, ref: "RoleMaster" },
    status: { type: Number },
    pageStatus: { type: Number },
    formStatus: { type: String },
    startDate: { type: Date },
    createdBy: { type: Schema.Types.ObjectId, ref: "Employee" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  },
  { strict: false }
);

// Export the model and return your IUser interface
export default mongoose.model<IEmployeeStore>("EmployeeStore", EmployeeStoreSchema, "employeeStore");
