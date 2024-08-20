import { z } from "zod";
import {
  tagReqSchema,
  allTagsRespSchema,
  tagSchema,
} from "../schemas/tag.schema";
import { IToDo } from "./toDo.interface";

type ITagReq = z.infer<typeof tagReqSchema>;

type ITagResp = IToDo & {
  tags: {
    tag: z.infer<typeof tagSchema>;
  }[];
};

// mesma coisa do de cima
// interface ITagResp extends IToDo {
//   tags: {
//     tag: z.infer<typeof tagSchema>;
//   }[];
// }

type ITagUpdate = z.infer<typeof tagSchema>;

type IAllTagsResp = z.infer<typeof allTagsRespSchema>;

export { ITagReq, ITagResp, ITagUpdate, IAllTagsResp };
