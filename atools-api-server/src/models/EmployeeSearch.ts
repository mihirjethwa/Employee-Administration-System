import mongoose, { Schema, Document, Model, Types } from "mongoose";

const EmployeeSearchSchema = new Schema<any>(
  {
    employeeId: { type: String },
  },
  { strict: false }
);

// Export the model and return your IUser interface
export default mongoose.model<any>("EmployeeSearch", EmployeeSearchSchema, "employeeGeneral");
