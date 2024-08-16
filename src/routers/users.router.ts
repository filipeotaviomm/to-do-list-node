import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
} from "../controllers/users.controller";
import {
  doesUserExist,
  doesUserHavePermission,
  isEmailUnique,
  isEmailUniqueInCreation,
  isUserAdmin,
  isUserLogged,
  isUsernameUnique,
  isUsernameUniqueInCreation,
} from "../middlewares/users.middleware";
import { validateBody } from "../middlewares/globals.middleware";
import { userReqSchema, userUpdateSchema } from "../schemas/user.schema";

export const userRouter: Router = Router();

userRouter.post(
  "/register",
  validateBody(userReqSchema),
  isEmailUniqueInCreation,
  isUsernameUniqueInCreation,
  createUserController
);

userRouter.get("/all", isUserLogged, isUserAdmin, getAllUsersController);

userRouter.get(
  "/:id",
  doesUserExist,
  isUserLogged,
  doesUserHavePermission,
  getUserByIdController
);

userRouter.patch(
  "/:id",
  doesUserExist,
  isUserLogged,
  doesUserHavePermission,
  validateBody(userUpdateSchema),
  isEmailUnique,
  isUsernameUnique,
  updateUserController
);

userRouter.delete(
  "/:id",
  doesUserExist,
  isUserLogged,
  doesUserHavePermission,
  deleteUserController
);
