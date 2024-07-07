import { Router } from "express";
import {
  createAddressController,
  deleteAddressController,
  getAllAddressesController,
  getUserAddressController,
  updateAddressController,
} from "../controllers/addresses.controller";
import {
  doesUserHavePermission,
  isUserAdmin,
  isUserLogged,
} from "../middlewares/users.middleware";
import { validateBody } from "../middlewares/globals.middleware";
import { addressReqSchema } from "../schemas/address.schema";

export const addressRouter: Router = Router();

addressRouter.post(
  "/",
  isUserLogged,
  validateBody(addressReqSchema),
  createAddressController
);

addressRouter.get("/all", isUserLogged, isUserAdmin, getAllAddressesController);

addressRouter.get("/", isUserLogged, getUserAddressController);

addressRouter.put("/:addressId", isUserLogged, updateAddressController);

addressRouter.delete("/:addressId", isUserLogged, deleteAddressController);
