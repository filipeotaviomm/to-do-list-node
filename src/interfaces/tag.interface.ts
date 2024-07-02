import { z } from "zod";
import {
  tagReqSchema,
  tagRespSchema,
  allTagsRespSchema,
} from "../schemas/tag.schema";

type IContactReq = z.infer<typeof tagReqSchema>;
type IContactResp = z.infer<typeof tagRespSchema>;
type IContactsResp = z.infer<typeof allTagsRespSchema>;

interface ITagUpdate {
  name?: string;
}

export { IContactReq, IContactResp, IContactsResp, ITagUpdate };
