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
  isUserAdmin,
  isUserLogged,
  isUsernameUnique,
} from "../middlewares/users.middleware";
import { validateBody } from "../middlewares/globals.middleware";
import { userReqSchema, userUpdateSchema } from "../schemas/user.schema";

export const userRouter: Router = Router();

userRouter.post(
  "/register",
  validateBody(userReqSchema),
  isEmailUnique,
  isUsernameUnique,
  createUserController
);

userRouter.get("/all", isUserLogged, isUserAdmin, getAllUsersController);

userRouter.get(
  "/:userId",
  doesUserExist,
  isUserLogged,
  doesUserHavePermission,
  getUserByIdController
);

userRouter.patch(
  "/:userId",
  doesUserExist,
  isUserLogged,
  doesUserHavePermission,
  validateBody(userUpdateSchema),
  isEmailUnique,
  isUsernameUnique,
  updateUserController
);

userRouter.delete(
  "/:userId",
  doesUserExist,
  isUserLogged,
  doesUserHavePermission,
  deleteUserController
);
