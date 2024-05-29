import mongoose, { Schema, Document, Types } from "mongoose";

export interface ILocationMaster extends Document {
  locationCode: string;
  location: string;
  state: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: Types.ObjectId | Record<string, unknown>;
}

const LocationMasterSchema = new Schema<ILocationMaster>({
  location: { type: String, required: true },
  locationCode: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  createdBy: { type: Schema.Types.ObjectId, ref: "Employee" },
});

// Export the model and return your ILocationMaster interface
export default mongoose.model<ILocationMaster>("LocationMaster", LocationMasterSchema, "locationMaster");
