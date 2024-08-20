import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { Tag, ToDo, ToDoTag } from "@prisma/client";
import { prisma } from "../app";

export const doesTagExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const tag: Tag | null = await prisma.tag.findUnique({
    where: { id: +req.params.id },
  });

  if (!tag) {
    throw new AppError("Tag not found", 404);
  }

  res.locals.tag = tag;

  return next();
};

export const doesTagIdExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const tag: Tag | null = await prisma.tag.findUnique({
    where: { id: +req.params.tagId },
  });

  if (!tag) {
    throw new AppError("Tag not found", 404);
  }

  res.locals.tag = tag;

  return next();
};

export const doesTagExistInThisDo = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const check: ToDoTag | null = await prisma.toDoTag.findUnique({
    where: {
      todo_id_tag_id: {
        todo_id: parseInt(req.params.toDoId),
        tag_id: parseInt(req.params.tagId),
      },
    },
  });

  if (!check) {
    throw new AppError("Tag not related to this ToDo", 404);
  }

  return next();
};
