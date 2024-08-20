import { z } from "zod";

const tagSchema = z.object({
  id: z.number(),
  name: z.string().max(10),
});

const tagReqSchema = tagSchema.omit({
  id: true,
});

const allTagsRespSchema = tagSchema.array();

export { tagSchema, tagReqSchema, allTagsRespSchema };
