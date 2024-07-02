import { z } from "zod";

const tagSchema = z.object({
  id: z.number(),
  name: z.string().max(10),
});

const tagReqSchema = tagSchema.omit({
  id: true,
});

const tagRespSchema = tagSchema;

const allTagsRespSchema = tagSchema.array();

const tagUpdateSchema = tagReqSchema.partial();

export {
  tagSchema,
  tagReqSchema,
  tagRespSchema,
  allTagsRespSchema,
  tagUpdateSchema,
};
