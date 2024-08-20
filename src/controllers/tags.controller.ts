import { Request, Response } from "express";
import {
  createTagService,
  deleteTagOfToDoService,
  deleteTagService,
  getAllTagsByToDoService,
  getAllTagsService,
  getTagByIdService,
  updateTagService,
} from "../services/tags.service";
import { IAllTagsResp } from "../interfaces/tag.interface";

const createTagController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const toDoTag = await createTagService(req.body, +req.params.id);
  return res.status(201).json(toDoTag);
};

const getAllTagsController = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  const allTags: IAllTagsResp = await getAllTagsService();
  return res.status(200).json(allTags);
};

const getAllTagsByToDoController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const allTags = await getAllTagsByToDoService(+req.params.id);
  return res.status(200).json(allTags);
};

const getTagByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const tag = await getTagByIdService(+req.params.id);
  return res.status(200).json(tag);
};

const updateTagController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const tag = await updateTagService(+req.params.id, req.body);
  return res.status(200).json(tag);
};

const deleteTagOfToDoController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const toDoUpdated = await deleteTagOfToDoService(
    +req.params.toDoId,
    +req.params.tagId
  );
  return res.status(200).json(toDoUpdated);
};

const deleteTagController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteTagService(+req.params.tagId);
  return res.status(204).json();
};

export {
  createTagController,
  getAllTagsController,
  getAllTagsByToDoController,
  getTagByIdController,
  updateTagController,
  deleteTagOfToDoController,
  deleteTagController,
};
