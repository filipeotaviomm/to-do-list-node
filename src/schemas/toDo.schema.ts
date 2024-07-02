import { z } from "zod";

const priorityEnum = z.enum(["LOW", "MEDIUM", "HIGH"]);

const toDoSchema = z.object({
  id: z.number(),
  name: z.string().max(30),
  description: z.string().max(1000),
  accomplished: z.boolean(),
  priority: priorityEnum,
  user_id: z.string(),
});

const toDoReqSchema = toDoSchema.omit({
  id: true,
  user_id: true,
});

const toDoRespSchema = toDoSchema;

const allToDosRespSchema = toDoSchema.array();

const toDoUpdateSchema = toDoReqSchema.partial();

export {
  toDoSchema,
  toDoReqSchema,
  toDoRespSchema,
  allToDosRespSchema,
  toDoUpdateSchema,
};
