import mongoose, { Schema, Document, Types } from "mongoose";

export interface IDocumentMaster extends Document {
  role: Types.ObjectId | Record<string, unknown>;
  documentName: string;
  roleName: string;
  required: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: Types.ObjectId | Record<string, unknown>;
}

const DocumentMasterSchema = new Schema<IDocumentMaster>(
  {
    role: { type: Schema.Types.ObjectId, ref: "RoleMaster" },
    roleName: { type: String },
    documentName: [{ type: String, required: true }],
    required: [{ type: Boolean }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    createdBy: { type: Schema.Types.ObjectId, ref: "Employee" },
  },
  { strict: false }
);

// Export the model and return your ILocationMaster interface
export default mongoose.model<IDocumentMaster>("DocumentMaster", DocumentMasterSchema, "documentMaster");
