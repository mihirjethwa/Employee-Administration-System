import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IEmployeeFeedback extends Document {
  employeeId: string;
  dateOfIssue: Date;
  dateOfSubmission: Date;
  feedbackType: String;
  feedbackCriteria: String;
  observation: String;
  feedbackGiven: String;
  oer: String;
  followupRequest: Boolean;
  feedbackFormFile: String;
  understandImplicaton: Boolean;
  managerName: String;
  createdAt: Date;
  updatedAt: Date;
  createdBy: Types.ObjectId | Record<string, unknown>;
}

const EmployeeFeedbackSchema = new Schema<IEmployeeFeedback>({
  employeeId: { type: Schema.Types.ObjectId, ref: "Employee" },
  dateOfIssue: { type: Date },
  dateOfSubmission: { type: Date },
  feedbackType: { type: String },
  feedbackCriteria: { type: String },
  observation: { type: String },
  feedbackGiven: { type: String },
  oer: { type: String },
  followupRequest: { type: Boolean },
  feedbackFormFile: { type: String },
  understandImplicaton: { type: Boolean },
  managerName: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  createdBy: { type: Schema.Types.ObjectId, ref: "Employee" },
});

// Export the model and return your IUser interface
export default mongoose.model<IEmployeeFeedback>("EmployeeFeedback", EmployeeFeedbackSchema, "employeeFeedback");
