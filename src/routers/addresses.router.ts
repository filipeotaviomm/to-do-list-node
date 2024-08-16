import { Router } from "express";
import {
  createAddressController,
  deleteAddressController,
  getAllAddressesController,
  getUserAddressController,
  updateAddressController,
} from "../controllers/addresses.controller";
import { isUserAdmin, isUserLogged } from "../middlewares/users.middleware";
import { validateBody } from "../middlewares/globals.middleware";
import { addressReqSchema } from "../schemas/address.schema";
import {
  doesAddressExist,
  doesUserHavePermission,
} from "../middlewares/addresses.middleware";

export const addressRouter: Router = Router();

addressRouter.post(
  "/",
  isUserLogged,
  validateBody(addressReqSchema),
  createAddressController
);

addressRouter.get("/current", isUserLogged, getUserAddressController);

addressRouter.get("/all", isUserLogged, isUserAdmin, getAllAddressesController);

addressRouter.put(
  "/:id",
  isUserLogged,
  doesAddressExist,
  doesUserHavePermission,
  updateAddressController
);

addressRouter.delete(
  "/:id",
  isUserLogged,
  doesAddressExist,
  doesUserHavePermission,
  deleteAddressController
);
