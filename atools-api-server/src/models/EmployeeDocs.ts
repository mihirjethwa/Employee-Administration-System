import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IEmployeeDocs extends Document {
  employeeId: Types.ObjectId | Record<string, unknown>;
  fileRequired: string;
  successfullyUploded: string;
  documentVerified: string;
  additionalDocuments: boolean;
  documents: any;
  createdAt: Date;
  updatedAt: Date;
  createdBy: Types.ObjectId | Record<string, unknown>;
  employee: any;
}

const EmployeeDocsSchema = new Schema<IEmployeeDocs>({
  employeeId: { type: Schema.Types.ObjectId, ref: "Employee" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  documents: { type: Schema.Types.Array },
  createdBy: { type: Schema.Types.ObjectId, ref: "Employee" },
  employee:{ type: Object }
});

// Export the model and return your IUser interface
export default mongoose.model<IEmployeeDocs>("EmployeeDocs", EmployeeDocsSchema, "employeeDocs");
