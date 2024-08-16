import { Router } from "express";
import { toDoReqSchema, toDoUpdateSchema } from "../schemas/toDo.schema";
import {
  createToDoController,
  deleteToDoController,
  getAllToDosController,
  getToDoByIdController,
  updateToDoController,
} from "../controllers/toDos.controller";
import { validateBody } from "../middlewares/globals.middleware";
import { isUserLogged } from "../middlewares/users.middleware";
import {
  doesToDoExist,
  doesUserHavePermission,
} from "../middlewares/toDos.middleware";

export const toDoRouter: Router = Router();

toDoRouter.post(
  "/",
  isUserLogged,
  validateBody(toDoReqSchema),
  createToDoController
);

toDoRouter.get("/all", isUserLogged, getAllToDosController);

toDoRouter.get(
  "/:id",
  isUserLogged,
  doesToDoExist,
  doesUserHavePermission,
  getToDoByIdController
);

toDoRouter.patch(
  "/:id",
  isUserLogged,
  doesToDoExist,
  doesUserHavePermission,
  validateBody(toDoUpdateSchema),
  updateToDoController
);

toDoRouter.delete(
  "/:id",
  isUserLogged,
  doesToDoExist,
  doesUserHavePermission,
  deleteToDoController
);
