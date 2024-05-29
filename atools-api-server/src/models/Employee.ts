import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IEmployee extends Document {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: Types.ObjectId | Record<string, unknown>;
  store: Types.ObjectId | Record<string, unknown>;
  formCompleted: Boolean;
  pageStatus: string;
  canLogin: Boolean;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
  startDate: Date;
  empStatus: String;
  setLastLogin(id: string, cb: Function): void;
}

const EmployeeSchema = new Schema<IEmployee>({
  userName: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  password: { type: String },
  role: { type: Schema.Types.ObjectId, ref: "RoleMaster" },
  store: { type: Schema.Types.ObjectId, ref: "StoreMaster" },
  formCompleted: { type: Boolean },
  pageStatus: { type: String },
  canLogin: { type: Boolean },
  lastLogin: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  createdBy: { type: String },
  startDate: { type: Date },
  empStatus: { type: String },
});

EmployeeSchema.methods.setLastLogin = function (this: IEmployee, id: any, cb: any) {
  const now = new Date();
  this.model("Employee").findByIdAndUpdate(id, { $set: { lastLogin: now } }, cb);
};

// Export the model and return your IUser interface
export default mongoose.model<IEmployee>("Employee", EmployeeSchema, "employee");
