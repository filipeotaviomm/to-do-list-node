import "express-async-errors";
import express, { Application, json } from "express";
import { PrismaClient } from "@prisma/client";
import { handleError } from "./errors";
import { router } from "./routers/index.router";
import cors from "cors";

export const app: Application = express();

export const prisma = new PrismaClient();

app.use(cors({ origin: "http://localhost:5173" }));

app.use(json());

app.use("/", router);

app.use(handleError);
