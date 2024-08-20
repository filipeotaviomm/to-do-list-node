import { z } from "zod";
import { Priorities } from "@prisma/client";
import {
  toDoReqSchema,
  toDoRespSchema,
  allToDosRespSchema,
  toDoSchema,
} from "../schemas/toDo.schema";

type IToDo = z.infer<typeof toDoSchema>;
type IToDoReq = z.infer<typeof toDoReqSchema>;
type IToDoResp = z.infer<typeof toDoRespSchema>;
type IToDosResp = z.infer<typeof allToDosRespSchema>;

interface IToDoUpdate {
  name?: string;
  description?: string;
  accomplished?: boolean;
  priority?: Priorities;
  isFavorite?: boolean;
}

export { IToDoReq, IToDoResp, IToDosResp, IToDoUpdate, IToDo };
