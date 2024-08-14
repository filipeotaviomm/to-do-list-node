import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { User } from "@prisma/client";
import { prisma } from "../app";
import { verify } from "jsonwebtoken";

export const isEmailUnique = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const containsEmail = req.body.email;
  const userByIdInUrl: User | null = await prisma.user.findUnique({
    where: { id: req.params.userId },
  });

  if (!containsEmail) return next();

  const userLoggedById: User | null = await prisma.user.findUnique({
    where: { id: res.locals.decoded.sub },
  });

  if (userLoggedById?.email === req.body.email) return next();
  if (userByIdInUrl?.email === req.body.email) return next();

  const userByEmail: User | null = await prisma.user.findUnique({
    where: { email: req.body.email },
  });

  if (userByEmail) {
    throw new AppError("Username already exists", 409);
  }

  return next();
};

export const isUsernameUnique = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const containsUsername = req.body.username;
  const userByIdInUrl: User | null = await prisma.user.findUnique({
    where: { id: req.params.userId },
  });

  if (!containsUsername) return next();

  const userLoggedById: User | null = await prisma.user.findUnique({
    where: { id: res.locals.decoded.sub },
  });

  if (userLoggedById?.username === req.body.username) return next();
  if (userByIdInUrl?.username === req.body.username) return next();

  const userByUsername: User | null = await prisma.user.findUnique({
    where: { username: req.body.username },
  });

  if (userByUsername) {
    throw new AppError("Username already exists", 409);
  }

  return next();
};

export const isUserLogged = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authorization: string | undefined = req.headers.authorization;
  if (!authorization) {
    throw new AppError("Missing bearer token", 401);
  }

  const token = authorization.split(" ")[1];

  const decoded = verify(token, process.env.SECRET_KEY!);

  res.locals.decoded = decoded;

  return next();
};

export const doesUserExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user: User | null = await prisma.user.findUnique({
    where: { id: req.params.userId },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.locals.user = user;

  return next();
};

export const isUserAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user: User | null = await prisma.user.findUnique({
    where: { id: res.locals.decoded.sub },
  });

  if (user?.role === "USER") {
    throw new AppError("You do not have permission", 403);
  }

  return next();
};

export const doesUserHavePermission = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userLoggedId = res.locals.decoded.sub;
  const userIdUrl = req.params.userId;
  const user: User | null = await prisma.user.findUnique({
    where: { id: res.locals.decoded.sub },
  });

  if (userLoggedId !== userIdUrl && user?.role === "USER") {
    throw new AppError("You do not have permission", 403);
  }

  return next();
};
