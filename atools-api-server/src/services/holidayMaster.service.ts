import HolidayMaster, { IHolidayMaster } from "../models/HolidayMaster";

export const createHolidayMaster = async (data: any): Promise<IHolidayMaster> => {
  const newHolidayMaster = new HolidayMaster({
    holidayDate: data.holidayDate,
    holidayReason: data.holidayReason,
    createdBy: data.employee.id,
  });

  return newHolidayMaster;
};
