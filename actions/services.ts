"use server";

import { db } from "@/lib/db";

export const addServices = async (data: FormData) => {
  const title = data.get("title") as string;
  const description = data.get("desc") as string;
  const img = data.get("image") as string;

  await db.services.create({
    data: {
      title,
      description,
      img,
    },
  });

  return { success: true };
};
