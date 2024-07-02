import { z } from "zod";
import {
  addressReqSchema,
  addressRespSchema,
  allAddressesRespSchema,
} from "../schemas/address.schema";

type IContactReq = z.infer<typeof addressReqSchema>;
type IContactResp = z.infer<typeof addressRespSchema>;
type IContactsResp = z.infer<typeof allAddressesRespSchema>;

interface IContactUpdate {
  avatar?: string;
  name?: string;
  email?: string | null;
  password?: string;
  phone?: string;
  isFavorite?: boolean;
}

export { IContactReq, IContactResp, IContactsResp, IContactUpdate };
