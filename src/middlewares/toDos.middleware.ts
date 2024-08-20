import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { ToDo, User } from "@prisma/client";
import { prisma } from "../app";

export const doesToDoExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const toDo: ToDo | null = await prisma.toDo.findUnique({
    where: { id: +req.params.id },
  });

  if (!toDo) {
    throw new AppError("To Do not found", 404);
  }

  res.locals.toDo = toDo;

  return next();
};

export const doesToDoIdExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const toDo: ToDo | null = await prisma.toDo.findUnique({
    where: { id: +req.params.toDoId },
  });

  if (!toDo) {
    throw new AppError("To Do not found", 404);
  }

  res.locals.toDo = toDo;

  return next();
};

export const doesUserHavePermission = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const toDo: ToDo | null = await prisma.toDo.findUnique({
    where: { id: res.locals.toDo.id },
  });

  const user: User | null = await prisma.user.findUnique({
    where: { id: res.locals.decoded.sub },
  });

  if (user?.role === "ADMIN") return next();

  if (toDo?.user_id === user?.id) {
    return next();
  }

  throw new AppError("You do not have permission", 403);
};
