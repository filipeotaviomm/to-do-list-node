import { Request, Response } from "express";
import {
  createToDoService,
  deleteToDoService,
  getAllToDosService,
  getToDoByIdService,
  updateToDoService,
} from "../services/toDos.service";

const createToDoController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const toDo = await createToDoService(req.body, res.locals.decoded.sub);
  return res.status(201).json(toDo);
};

const getAllToDosController = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  const toDos = await getAllToDosService(res.locals.decoded.sub);
  return res.status(200).json(toDos);
};

const getToDoByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const toDo = await getToDoByIdService(+req.params.id);
  return res.status(200).json(toDo);
};

const updateToDoController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const toDo = await updateToDoService(+req.params.id, req.body);
  return res.status(200).json(toDo);
};

const deleteToDoController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteToDoService(+req.params.id);
  return res.status(204).json();
};

export {
  createToDoController,
  getAllToDosController,
  getToDoByIdController,
  updateToDoController,
  deleteToDoController,
};
