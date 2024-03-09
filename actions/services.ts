"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import crypto from "crypto";
import { auth } from "@/auth";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function createService(data: FormData) {
  const session = await auth();

  if (!session) {
    return { failure: "not authenticated" };
  }

  const title = data.get("title") as string;
  const subtitle = data.get("subtitle") as string;
  const description = data.get("description") as string;
  const image_url = data.get("image_url") as string;

  await db.services.create({
    data: {
      title,
      subtitle,
      description,
      image_url,
    },
  });

  revalidatePath("/services/list");
  redirect("/services/list");
}

const allowedFileTypes = [
  "image/jpeg",
  "image/png",
  "video/mp4",
  "video/quicktime",
  "image/svg+xml",
];

const maxFileSize = 1048576 * 10; // 1 MB

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

type SignedURLResponse = Promise<
  | { failure?: undefined; success: { url: string; id: number } }
  | { failure: string; success?: undefined }
>;

type GetSignedURLParams = {
  fileType: string;
  fileSize: number;
  checksum: string;
};
export const getSignedURL = async ({
  fileType,
  fileSize,
  checksum,
}: GetSignedURLParams) => {
  const session = await auth();

  if (!session) {
    return { failure: "not authenticated" };
  }

  if (!allowedFileTypes.includes(fileType)) {
    return { failure: "File type not allowed" };
  }

  if (fileSize > maxFileSize) {
    return { failure: "File size too large" };
  }

  const fileName = generateFileName();

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileName,
    ContentType: fileType,
    ContentLength: fileSize,
    ChecksumSHA256: checksum,
  });

  const url = await getSignedUrl(
    s3Client,
    putObjectCommand,
    { expiresIn: 60 } // 60 seconds
  );

  return { success: { url } };
};

export async function getServices() {
  const services = await db.services.findMany();

  return services;
}

export async function getService(id: string) {
  const service = await db.services.findUnique({
    where: {
      id,
    },
  });

  return service;
}

export async function updateService(data: FormData) {
  const id = data.get("id") as string;
  const title = data.get("title") as string;
  const subtitle = data.get("subtitle") as string;
  const description = data.get("description") as string;
  const image_url = data.get("image_url") as string;

  const service = await db.services.update({
    where: {
      id,
    },

    data: {
      title,
      subtitle,
      description,
      image_url,
    },
  });

  return service;
}
