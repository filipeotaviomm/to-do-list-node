import { Request, Response } from "express";
import { loginService } from "../services/session.service";
import { ILoginResp } from "../interfaces/user.interface";

export const loginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const token: ILoginResp = await loginService(req.body);

  return res.status(200).json(token);
};
