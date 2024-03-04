"use server";

import { db } from "@/lib/db";

export const addAbout = async (data: FormData) => {
  const title = data.get("title") as string;
  const description = data.get("desc") as string;

  await db.aboutus.create({
    data: {
      title,
      description,
    },
  });

  return { success: true };
};

export const getAboutus = async () => {
  const aboutus = await db.aboutus.findFirst({
    orderBy: {
      id: "desc",
    },
  });
  return aboutus;
};

export const getUniqueAboutus = async (id: string) => {
  const aboutus = await db.aboutus.findUnique({
    where: {
      id,
    },
  });
  return aboutus;
};

export const updateAbout = async (id: string, data: FormData) => {
  const title = data.get("title") as string;
  const description = data.get("desc") as string;

  await db.aboutus.update({
    where: { id },
    data: {
      title,
      description,
    },
  });

  return { success: true };
};
