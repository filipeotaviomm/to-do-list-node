import { z } from "zod";
import {
  loginSchema,
  userReqSchema,
  userRespSchema,
  allUsersRespSchema,
} from "../schemas/user.schema";

type IUserReq = z.infer<typeof userReqSchema>;
type IUserResp = z.infer<typeof userRespSchema>;
type IAllUsersResp = z.infer<typeof allUsersRespSchema>;

interface IUserUpdate {
  profileImageUrl?: string;
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  role?: "USER" | "ADMIN";
}

type ILoginReq = z.infer<typeof loginSchema>;
type ILoginResp = { name: string; token: string };

export {
  IUserReq,
  IUserResp,
  IAllUsersResp,
  IUserUpdate,
  ILoginReq,
  ILoginResp,
};
