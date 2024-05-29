import StoreMaster, { IStoreMaster } from "../models/StoreMaster";

export const createStoreMaster = async (data: any): Promise<IStoreMaster> => {
  const newStoreMaster = new StoreMaster({
    storeName: data.storeName,
    storeLocation: data.storeLocation,
    storeAddress: data.storeAddress,
    storeZip: data.storeZip,
    storeCode: data.storeCode,
    contactPerson: data.contactPerson,
    contactNumber: data.contactNumber,
    contactEmail: data.contactEmail,
    createdBy: data.employee.id,
  });

  return newStoreMaster;
};
