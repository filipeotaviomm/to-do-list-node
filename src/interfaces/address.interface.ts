import { z } from "zod";
import {
  addressReqSchema,
  addressRespSchema,
  allAddressesRespSchema,
} from "../schemas/address.schema";

type IAddressReq = z.infer<typeof addressReqSchema>;
type IAddressResp = z.infer<typeof addressRespSchema>;
type IAllAddressesResp = z.infer<typeof allAddressesRespSchema>;

interface IAddressUpdate {
  street?: string;
  zipCode?: string;
  number?: string;
  city?: string;
  state?: string;
}

export { IAddressReq, IAddressResp, IAllAddressesResp, IAddressUpdate };
