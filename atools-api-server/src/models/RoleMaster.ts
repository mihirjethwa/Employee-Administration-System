import { NumberAttributeValue } from "aws-sdk/clients/dynamodb";
import mongoose, { Schema, Document, Types } from "mongoose";
import Employee, { IEmployee } from "./Employee";

export interface IRoleMaster extends Document {
  createdBy: Types.ObjectId | Record<string, unknown>;
  roleName: string;
  membersListed: number;
  createdAt: Date;
  updatedAt: Date;
}

const RoleMasterSchema = new Schema<IRoleMaster>({
  createdBy: { type: Schema.Types.ObjectId, ref: "Employee" },
  roleName: { type: String, required: true },
  membersListed: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

RoleMasterSchema.pre("remove", function (next) {
  this.model("AcessMaster").remove({ role: this._id }, next);
  console.log("Role master remove called");
  next();
});

// Export the model and return your ILocationMaster interface
export default mongoose.model<IRoleMaster>("RoleMaster", RoleMasterSchema, "roleMaster");
