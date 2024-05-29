import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IEmployeeContract extends Document {
  employeeId: Types.ObjectId | Record<string, unknown>;
  documents: any;
  contractUploaded: Date;
  waitingAmendment: Boolean;
  amendmentDate: Date;
  createdAt: Date;
  updatedAt: Date;
  employee: any;
  createdBy: Types.ObjectId | Record<string, unknown>;
}

const EmployeeContractSchema = new Schema<IEmployeeContract>(
  {
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee" },
    contractUploaded: { type: Date },
    waitingAmendment: { type: Boolean },
    amendmentDate: { type: Date },
    documents: { type: Schema.Types.Array },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    createdBy: { type: Schema.Types.ObjectId, ref: "Employee" },
  },
  { strict: false }
);

// Export the model and return your IUser interface
export default mongoose.model<IEmployeeContract>("EmployeeContract", EmployeeContractSchema, "employeeContract");
