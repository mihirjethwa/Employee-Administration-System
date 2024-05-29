import mongoose, { Schema, Document, Types } from "mongoose";

export interface INationality extends Document {
  createdBy: Types.ObjectId | Record<string, unknown>;
  nationalityName: string;
  subLocations:Array<string>
  createdAt: Date;
  updatedAt: Date;
}

const NationalitySchema = new Schema<INationality>({
  createdBy: { type: Schema.Types.ObjectId, ref: "Employee" },
  nationalityName: { type: String },
  subLocations:[{ type: Array }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

// Export the model and return your ILocationMaster interface
export default mongoose.model<INationality>("Nationality", NationalitySchema, "nationality");
