import { Address, User } from "@prisma/client";
import {
  IAddressReq,
  IAddressResp,
  IAddressUpdate,
  IAllAddressesResp,
} from "../interfaces/address.interface";
import { prisma } from "../app";
import { addressRespSchema } from "../schemas/address.schema";
import { AppError } from "../errors";

const createAddressService = async (
  data: IAddressReq,
  userId: string
): Promise<IAddressResp> => {
  const user: User | null = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (user?.address_id !== null) {
    throw new AppError(
      "This user already has an address. Try to update it",
      400
    );
  }

  const address: Address = await prisma.address.create({ data });

  await prisma.user.update({
    where: { id: userId },
    data: { address_id: address.id },
  });

  return addressRespSchema.parse(address);
};

const getUserAddressService = async (
  userId: string
): Promise<IAddressResp | null> => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  const address = await prisma.address.findUnique({
    where: { id: Number(user?.address_id) },
  });

  return address;
};

const getAllAddressesService = async (): Promise<IAllAddressesResp> => {
  const allAddresses: Address[] = await prisma.address.findMany({
    orderBy: { id: "asc" },
  });
  return allAddresses;
};

const updateAddressService = async (
  addressId: number,
  addressData: IAddressUpdate
): Promise<IAddressResp> => {
  const address = await prisma.address.update({
    where: { id: addressId },
    data: addressData,
  });
  return address;
};

const deleteAddressService = async (addressId: number): Promise<void> => {
  await prisma.address.delete({ where: { id: addressId } });
};

export {
  createAddressService,
  getAllAddressesService,
  getUserAddressService,
  updateAddressService,
  deleteAddressService,
};
