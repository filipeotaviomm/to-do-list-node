import { ToDo } from "@prisma/client";
import {
  IToDoReq,
  IToDoResp,
  IToDosResp,
  IToDoUpdate,
} from "../interfaces/toDo.interface";
import { allToDosRespSchema, toDoRespSchema } from "../schemas/toDo.schema";
import { prisma } from "../app";

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
    orderBy: { priority: "desc" },
  });

  return allToDosRespSchema.parse(toDos);
};

const getToDoByIdService = async (
  toDoId: number
): Promise<IToDoResp | null> => {
  const toDo: ToDo | null = await prisma.toDo.findUnique({
    where: { id: toDoId },
  });
  return toDo;
};

const updateToDoService = async (
  toDoId: number,
  toDoData: IToDoUpdate
): Promise<IToDoUpdate> => {
  const toDo = prisma.toDo.update({
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
