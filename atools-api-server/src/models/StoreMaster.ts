import mongoose, { Schema, Document, Types } from "mongoose";

export interface IStoreMaster extends Document {
  createdBy: Types.ObjectId | Record<string, unknown>;
  storeName: string;
  storeLocation: string;
  storeAddress: string;
  storeZip: string;
  storeCode: string;
  contactPerson: string;
  contactNumber: string;
  contactEmail: string;
  createdAt: Date;
  updatedAt: Date;
}

const StoreMasterSchema = new Schema<IStoreMaster>({
  createdBy: { type: Schema.Types.ObjectId, ref: "Employee" },
  storeCode: { type: String },
  storeName: { type: String },
  storeLocation: { type: String },
  storeAddress: { type: String },
  storeZip: { type: String },
  contactPerson: { type: String },
  contactEmail: { type: String },
  contactNumber: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

// Export the model and return your ILocationMaster interface
export default mongoose.model<IStoreMaster>("StoreMaster", StoreMasterSchema, "storeMaster");
