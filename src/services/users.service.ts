import { hash } from "bcryptjs";
import { prisma } from "../app";
import {
  IAllUsersResp,
  IUserReq,
  IUserResp,
  IUserUpdate,
} from "../interfaces/user.interface";
import { allUsersRespSchema, userRespSchema } from "../schemas/user.schema";
import { User } from "@prisma/client";

const createUserService = async (data: IUserReq): Promise<IUserResp> => {
  const hashedPassword = await hash(data.password, 10);

  const user = {
    ...data,
    password: hashedPassword,
    role: data.role === undefined ? "USER" : data.role,
    profileImageUrl: data.profileImageUrl ? data.profileImageUrl : null,
  };
  const newUser: User = await prisma.user.create({ data: user });
  return userRespSchema.parse(newUser);
};

const getAllUsersService = async (): Promise<IAllUsersResp> => {
  const allUsers: User[] = await prisma.user.findMany();
  return allUsersRespSchema.parse(allUsers);
};

//não está funcionando
const getUserbyIdService = async (userId: string): Promise<IUserResp> => {
  const user: User | null = await prisma.user.findUnique({
    where: { id: userId },
  });
  return userRespSchema.parse(user);
};

const updateUserService = async (
  userId: string,
  userData: IUserUpdate
): Promise<IUserResp> => {
  const { password } = userData;
  if (password) {
    const hashedPassword = await hash(password, 10);
    userData = { ...userData, password: hashedPassword };
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: userData,
  });
  return userRespSchema.parse(user);
};

const deleteUserService = async (userId: string): Promise<void> => {
  await prisma.user.delete({ where: { id: userId } });
};

export {
  createUserService,
  getAllUsersService,
  getUserbyIdService,
  updateUserService,
  deleteUserService,
};
