import { Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUserbyIdService,
  updateUserService,
} from "../services/users.service";
import { IAllUsersResp, IUserResp } from "../interfaces/user.interface";

const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user: IUserResp = await createUserService(req.body);
  return res.status(201).json(user);
};

const getAllUsersController = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  const allUsers: IAllUsersResp = await getAllUsersService();
  return res.status(200).json(allUsers);
};

const getUserByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user: IUserResp = await getUserbyIdService(req.params.id);
  return res.status(200).json(user);
};

const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await updateUserService(req.params.id, req.body);
  return res.status(200).json(user);
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteUserService(req.params.id);
  return res.status(204).json();
};

export {
  createUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
};
