import mongoose, { Schema, Document, Types } from "mongoose";

interface Docgroup {
  label: String;
  documentName: Object;
}

export interface INationalityMaster extends Document {
  // nationality: Types.ObjectId | Record<string, unknown>;
  nationalityName: string;
  subLocation: Array<String>;
  documentGroups: Array<Docgroup>;
  createdAt: Date;
  updatedAt: Date;
  createdBy: Types.ObjectId | Record<string, unknown>;
}

const NationalityMasterSchema = new Schema<INationalityMaster>({
  // nationality: { type: Schema.Types.ObjectId, ref: "Nationality" },
  nationalityName: { type: String },
  subLocation: [{ type: String }],
  documentGroups: [{ type: Object }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  createdBy: { type: Schema.Types.ObjectId, ref: "Employee" },
});

// Export the model and return your ILocationMaster interface
export default mongoose.model<INationalityMaster>("NationalityMaster", NationalityMasterSchema, "nationalityMaster");
