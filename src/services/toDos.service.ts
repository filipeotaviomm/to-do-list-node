import { ToDo } from "@prisma/client";
import {
  IToDoReq,
  IToDoResp,
  IToDosResp,
  IToDoUpdate,
} from "../interfaces/toDo.interface";
import { prisma } from "../app";
import { toDoRespSchema } from "../schemas/toDo.schema";

const createToDoService = async (
  data: IToDoReq,
  userId: string
): Promise<IToDoResp> => {
  const toDo: ToDo = await prisma.toDo.create({
    data: { ...data, user_id: userId },
  });

  return toDoRespSchema.parse(toDo);
};

const getAllToDosService = async (userId: string): Promise<IToDosResp> => {
  const toDos: ToDo[] = await prisma.toDo.findMany({
    where: { user_id: userId },
    include: {
      tags: {
        select: {
          tag: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
  return toDos;
};

const getToDoByIdService = async (
  toDoId: number
): Promise<IToDoResp | null> => {
  const toDo: ToDo | null = await prisma.toDo.findUnique({
    where: { id: toDoId },
    include: {
      tags: {
        select: {
          tag: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
  return toDo;
};

const updateToDoService = async (
  toDoId: number,
  toDoData: IToDoUpdate
): Promise<IToDoUpdate> => {
  const toDo = await prisma.toDo.update({
    where: { id: toDoId },
    data: toDoData,
  });
  return toDo;
};

const deleteToDoService = async (toDoId: number): Promise<void> => {
  await prisma.toDo.delete({ where: { id: toDoId } });
};

export {
  createToDoService,
  getAllToDosService,
  getToDoByIdService,
  updateToDoService,
  deleteToDoService,
};
