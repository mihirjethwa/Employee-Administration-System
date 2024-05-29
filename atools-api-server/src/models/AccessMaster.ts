import mongoose, { Schema, Document, Types } from "mongoose";

export interface IAccessMaster extends Document {
  createdBy: Types.ObjectId | Record<string, unknown>;
  role: Types.ObjectId | Record<string, unknown>;
  modulesAccess: Array<Object>;
  // moduleOne: Boolean;
  // moduleTwo: Boolean;
  // moduleThree: Boolean;
  // moduleFour: Boolean;
  // moduleFive: Boolean;
  // modulwSix: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AcessMasterSchema = new Schema<IAccessMaster>({
  createdBy: { type: Schema.Types.ObjectId, ref: "Employee" },
  role: { type: Schema.Types.ObjectId, ref: "RoleMaster" },
  modulesAccess: { type: Array },
  // moduleOne: { type: Boolean },
  // moduleTow: { type: Boolean },
  // moduleThree: { type: Boolean },
  // moduleFour: { type: Boolean },
  // moduleFive: { type: Boolean },
  // moduleSix: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

// Export the model and return your ILocationMaster interface
export default mongoose.model<IAccessMaster>("AcessMaster", AcessMasterSchema, "AcessMaster");
