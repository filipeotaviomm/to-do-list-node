import { Tag, ToDo } from "@prisma/client";
import { prisma } from "../app";
import {
  IAllTagsResp,
  ITagReq,
  ITagResp,
  ITagUpdate,
} from "../interfaces/tag.interface";

const createTagService = async (
  data: ITagReq,
  toDoId: number
): Promise<ITagResp> => {
  const toDoFound: ToDo | null = await prisma.toDo.findUnique({
    where: { id: toDoId },
  });

  const tagNameSent = data.name.toLowerCase();
  const existingTag: Tag | null = await prisma.tag.findFirst({
    where: { name: tagNameSent },
  });

  if (!existingTag) {
    const newTag: Tag = await prisma.tag.create({
      data: { name: tagNameSent },
    });
    await prisma.toDoTag.create({
      data: { todo_id: Number(toDoFound?.id), tag_id: newTag.id },
    });
  } else {
    await prisma.toDoTag.create({
      data: { todo_id: Number(toDoFound?.id), tag_id: existingTag.id },
    });
  }

  const toDoWithNewTag: ITagResp | null = await prisma.toDo.findUnique({
    where: { id: toDoId },
    include: {
      tags: {
        select: {
          tag: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return toDoWithNewTag!;
};

const getAllTagsService = async (): Promise<IAllTagsResp> => {
  const allTags: Tag[] = await prisma.tag.findMany({
    orderBy: { id: "asc" },
  });
  return allTags;
};

const getAllTagsByToDoService = async (toDoId: number): Promise<ITagResp> => {
  const toDo = await prisma.toDo.findUnique({
    where: { id: toDoId },
    include: {
      tags: {
        select: {
          tag: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return toDo!;
};

const getTagByIdService = async (tagId: number): Promise<ITagUpdate | null> => {
  const Tag: Tag | null = await prisma.tag.findUnique({
    where: { id: tagId },
  });
  return Tag;
};

const updateTagService = async (
  tagId: number,
  tagData: ITagUpdate
): Promise<ITagUpdate> => {
  const tagNameLowerCase = tagData.name.toLowerCase();
  const bodyFormatted = { ...tagData, name: tagNameLowerCase };

  const tag = await prisma.tag.update({
    where: { id: tagId },
    data: bodyFormatted,
  });
  return tag;
};

const deleteTagOfToDoService = async (
  toDoId: number,
  tagId: number
): Promise<ITagResp> => {
  await prisma.toDoTag.delete({
    where: {
      todo_id_tag_id: {
        todo_id: toDoId,
        tag_id: tagId,
      },
    },
  });

  const toDoUpdated = await prisma.toDo.findUnique({
    where: { id: toDoId },
    include: {
      tags: {
        select: {
          tag: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return toDoUpdated!;
};

const deleteTagService = async (tagId: number): Promise<void> => {
  await prisma.tag.delete({ where: { id: tagId } });
};

export {
  createTagService,
  getAllTagsService,
  getAllTagsByToDoService,
  getTagByIdService,
  updateTagService,
  deleteTagOfToDoService,
  deleteTagService,
};
