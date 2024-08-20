import { Router } from "express";
import { sessionRouter } from "./session.router";
import { userRouter } from "./users.router";
import { addressRouter } from "./addresses.router";
import { toDoRouter } from "./toDos.router";
import { tagRouter } from "./tags.router";

export const router: Router = Router();

router.use("/user", userRouter);
router.use("/auth/login", sessionRouter);
router.use("/user/address", addressRouter);
router.use("/todo", toDoRouter);
router.use("/todo", tagRouter);
