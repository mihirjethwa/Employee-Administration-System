import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IEmployeeRight extends Document {
  employeeId: Types.ObjectId | Record<string, unknown>;
  nationality: Types.ObjectId | Record<string, unknown>;
  documentType: string;
  document: string;
  nationalityName: string;
  verifiedBy: Types.ObjectId | Record<string, unknown>;
  verifiedDate: Date;
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
  question6: string;
  question7: string;
  fullName: string;
  date: string;
  documents: Date;
  createdAt: Date;
  updatedAt: Date;
  employee: any;
  createdBy: Types.ObjectId | Record<string, unknown>;
}

const EmployeeRightSchema = new Schema<IEmployeeRight>({
  employeeId: { type: Schema.Types.ObjectId, ref: "Employee" },
  nationality: { type: Schema.Types.ObjectId, ref: "nationalityMaster" },
  nationalityName: { type: String },
  documentType: { type: String },
  question1: { type: String },
  question2: { type: String },
  question3: { type: String },
  question4: { type: String },
  question5: { type: String },
  question6: { type: String },
  question7: { type: String },
  fullName: { type: String },
  date: { type: Date },
  documents: { type: Schema.Types.Array },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  createdBy: { type: Schema.Types.ObjectId, ref: "Employee" },
  employee:{ type: Object }
});

// Export the model and return your IUser interface
export default mongoose.model<IEmployeeRight>("EmployeeRight", EmployeeRightSchema, "employeeRight");
