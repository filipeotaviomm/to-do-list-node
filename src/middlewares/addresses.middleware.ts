import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { Address, User } from "@prisma/client";
import { prisma } from "../app";

export const doesAddressExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const address: Address | null = await prisma.address.findUnique({
    where: { id: Number(req.params.id) },
  });

  if (!address) {
    throw new AppError("Address not found", 404);
  }

  return next();
};

export const doesUserHavePermission = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const addressIdUrl = Number(req.params.id);
  const user: User | null = await prisma.user.findUnique({
    where: { id: res.locals.decoded.sub },
  });

  if (user?.address_id !== addressIdUrl && user?.role === "USER") {
    throw new AppError("You do not have permission", 403);
  }

  return next();
};
