// @ts-ignore
import Joi from "@hapi/joi";

export const locationMasterSchema = Joi.object({
  locationCode: Joi.string().required(),
  location: Joi.string().required(),
  state: Joi.string().required(),
  city: Joi.string().required(),
  employee: Joi.object(),
});

export const roleMasterSchema = Joi.object({
  roleName: Joi.string().required(),
  employee: Joi.object(),
});

export const holidayMasterSchema = Joi.object({
  holidayDate: Joi.date().required(),
  holidayReason: Joi.string().required(),
  employee: Joi.object(),
});

export const storeMasterSchema = Joi.object({
  storeName: Joi.string().required(),
  storeLocation: Joi.string().required(),
  storeAddress: Joi.string().required(),
  storeZip: Joi.string().required(),
  storeCode: Joi.string().required(),
  contactNumber: Joi.string(),
  contactPerson: Joi.string(),
  contactEmail: Joi.string(),
  employee: Joi.object(),
});
export const h = Joi.object({
  holidayDate: Joi.date().required(),
  holidayReason: Joi.string().required(),
  employee: Joi.object(),
  asfbsafdgsf: Joi.string(),
});
