import { Router } from "express";
import { sessionRouter } from "./session.router";
import { userRouter } from "./users.router";

export const router: Router = Router();

router.use("/user", userRouter);
router.use("/auth/login", sessionRouter);
