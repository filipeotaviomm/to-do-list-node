import { Router } from "express";
import {
  createTagController,
  deleteTagController,
  deleteTagOfToDoController,
  getAllTagsByToDoController,
  getAllTagsController,
  getTagByIdController,
  updateTagController,
} from "../controllers/tags.controller";
import { isUserAdmin, isUserLogged } from "../middlewares/users.middleware";
import { validateBody } from "../middlewares/globals.middleware";
import { tagReqSchema } from "../schemas/tag.schema";
import {
  doesToDoExist,
  doesToDoIdExist,
  doesUserHavePermission,
} from "../middlewares/toDos.middleware";
import {
  doesTagExist,
  doesTagExistInThisDo,
  doesTagIdExist,
} from "../middlewares/tags.middleware";

export const tagRouter: Router = Router();

tagRouter.post(
  "/:id/tag",
  isUserLogged,
  doesToDoExist,
  validateBody(tagReqSchema),
  createTagController
);

tagRouter.get("/tag/all", isUserLogged, isUserAdmin, getAllTagsController);

tagRouter.get(
  "/:id/tags",
  isUserLogged,
  doesToDoExist,
  doesUserHavePermission,
  getAllTagsByToDoController
);

tagRouter.get("/tag/:id", isUserLogged, doesTagExist, getTagByIdController);

tagRouter.put(
  "/tag/:id",
  isUserLogged,
  doesTagExist,
  isUserAdmin,
  validateBody(tagReqSchema),
  updateTagController
);

tagRouter.delete(
  "/:toDoId/tag/:tagId",
  isUserLogged,
  doesToDoIdExist,
  doesUserHavePermission,
  doesTagIdExist,
  doesTagExistInThisDo,
  deleteTagOfToDoController
);

tagRouter.delete(
  "/tag/:tagId",
  isUserLogged,
  isUserAdmin,
  doesTagIdExist,
  deleteTagController
);
