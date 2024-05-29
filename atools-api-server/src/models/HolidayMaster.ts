import mongoose, { Schema, Document, Types } from "mongoose";

export interface IHolidayMaster extends Document {
  createdBy: Types.ObjectId | Record<string, unknown>;
  holidayDate: Date;
  holidayReason: String;
  createdAt: Date;
  updatedAt: Date;
}

const HolidayMasterSchema = new Schema<IHolidayMaster>({
  createdBy: { type: Schema.Types.ObjectId, ref: "Employee" },
  holidayDate: { type: Date, required: true },
  holidayReason: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

// Export the model and return your ILocationMaster interface
export default mongoose.model<IHolidayMaster>("HolidayMaster", HolidayMasterSchema, "holidayMaster");
