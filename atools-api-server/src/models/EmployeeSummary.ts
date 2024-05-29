import mongoose, { Schema, Document, Model, Types } from "mongoose";

const EmployeeSummarySchema = new Schema<any>(
  {
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee" },
  },
  { strict: false }
);

// Export the model and return your IUser interface
export default mongoose.model<any>("EmployeeSummary", EmployeeSummarySchema, "employeeSummaryView");
