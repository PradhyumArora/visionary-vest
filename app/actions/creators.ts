"use server";
import prisma from "@/prisma";

export async function fetchCreators() {
  const creators = await prisma.influencer.findMany();
  return creators;
}
export async function createCreator (name: string, imgUrl: string, description: string){

    const newCreator = await prisma.influencer.create({
    data: {
      name,
      image,
      description,
    },
  });

  return newCreator;
}

export async function fetchCreatorById(id: string) {
  const creator = await prisma.influencer.findUnique({
    where: {
      id: id,
    },
  });

  return creator;
}
export async function fetchCreatorByName(name: string) {
  const creator = await prisma.influencer.findUnique({
    where: {
      name: name,
    },
  });

  return creator;
}

