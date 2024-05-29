import mongoose, { Schema, Document, Types } from "mongoose";

export interface IDocumentAccessMaster extends Document {
  role: Types.ObjectId | Record<string, unknown>;
  documentGroupName: string;
  documents:Array<string>;
  GroupStatus:boolean
  createdAt: Date;
  updatedAt: Date;
  createdBy: Types.ObjectId | Record<string, unknown>;
}

const DocumentAccessMasterSchema = new Schema<IDocumentAccessMaster>(
  {
    documentGroupName: { type: String, required: true },
    documents:{ type: Schema.Types.Array },
    GroupStatus:{type:Boolean},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    createdBy: { type: Schema.Types.ObjectId, ref: "Employee" },
  }
);

// Export the model and return your ILocationMaster interface
export default mongoose.model<IDocumentAccessMaster>("DocumentAccessMaster", DocumentAccessMasterSchema, "documentAccessMaster");
