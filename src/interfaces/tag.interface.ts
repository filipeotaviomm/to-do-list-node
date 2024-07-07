import { z } from "zod";
import {
  tagReqSchema,
  tagRespSchema,
  allTagsRespSchema,
} from "../schemas/tag.schema";

type ITagReq = z.infer<typeof tagReqSchema>;
type ITagResp = z.infer<typeof tagRespSchema>;
type IAllTagsResp = z.infer<typeof allTagsRespSchema>;

interface ITagUpdate {
  name?: string;
}

export { ITagReq, ITagResp, IAllTagsResp, ITagUpdate };
