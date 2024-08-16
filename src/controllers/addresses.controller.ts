import { Request, Response } from "express";
import {
  IAddressResp,
  IAllAddressesResp,
} from "../interfaces/address.interface";
import {
  createAddressService,
  deleteAddressService,
  getAllAddressesService,
  getUserAddressService,
  updateAddressService,
} from "../services/addresses.service";

const createAddressController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const address: IAddressResp = await createAddressService(
    req.body,
    res.locals.decoded.sub
  );
  return res.status(201).json(address);
};

const getUserAddressController = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  const address: IAddressResp | null = await getUserAddressService(
    res.locals.decoded.sub
  );
  return res.status(200).json(address);
};

const getAllAddressesController = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  const allAddresses: IAllAddressesResp = await getAllAddressesService();
  return res.status(200).json(allAddresses);
};

const updateAddressController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const addressId = +req.params.id;
  const address = await updateAddressService(addressId, req.body);
  return res.status(200).json(address);
};

const deleteAddressController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteAddressService(+req.params.id);
  return res.status(204).json();
};

export {
  createAddressController,
  getAllAddressesController,
  getUserAddressController,
  updateAddressController,
  deleteAddressController,
};
