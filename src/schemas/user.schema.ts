import { z } from "zod";

const roleEnum = z.enum(["ADMIN", "USER"]);

const userSchema = z.object({
  id: z.string(),
  profileImageUrl: z.string().max(350).optional().nullable(),
  name: z.string().max(30),
  email: z.string().max(30).email(),
  username: z.string().max(30),
  password: z.string().max(255),
  role: roleEnum.nullish(),
  address_id: z.number().optional().nullable(),
});

const userReqSchema = userSchema.omit({
  id: true,
  address_id: true,
});

const userRespSchema = userSchema.omit({ password: true });

const allUsersRespSchema = userSchema.omit({ password: true }).array();

const userUpdateSchema = userReqSchema.partial();

const loginSchema = userSchema.pick({ email: true, password: true });

export {
  userSchema,
  userReqSchema,
  userRespSchema,
  allUsersRespSchema,
  userUpdateSchema,
  loginSchema,
};
