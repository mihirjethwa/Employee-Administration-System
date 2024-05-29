import mongoose, { Schema, Document, Types } from "mongoose";

export interface IDocument extends Document {
  documentLink: String;
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema = new Schema<IDocument>({
  documentLink: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

export default mongoose.model<IDocument>("Document", DocumentSchema, "documents");
