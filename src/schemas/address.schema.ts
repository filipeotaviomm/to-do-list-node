import { z } from "zod";

const addressSchema = z.object({
  id: z.number(),
  street: z.string().max(50),
  zipCode: z.string().max(8),
  number: z.string().max(5),
  city: z.string().max(20),
  state: z.string().max(2),
});

const addressReqSchema = addressSchema.omit({
  id: true,
});

const addressRespSchema = addressSchema;

const allAddressesRespSchema = addressSchema.array();

const addressUpdateSchema = addressReqSchema.partial();

export {
  addressSchema,
  addressReqSchema,
  addressRespSchema,
  allAddressesRespSchema,
  addressUpdateSchema,
};
