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

export async function createTestimonial(data: FormData) {
  const session = await auth();

  if (!session) {
    return { failure: "not authenticated" };
  }


  const full_name = data.get("full_name") as string;
  const title = data.get("title") as string;
  const testimony = data.get("testimony") as string;
  const image_url = data.get("image_url") as string;
  const stars = Number(data.get("stars") as string);

  await db.testimony.create({
    data: {
      title,
      full_name,
      testimony,
      image_url,
      stars
    },
  });

  revalidatePath("/testimonial/list");
  redirect("/testimonial/list");
}

const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];

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

export async function getTestimonials() {
  const testimony = await db.testimony.findMany();

  return testimony;
}

export async function getTestimony(id: string) {
  const testimony = await db.testimony.findUnique({
    where: {
      id,
    },
  });

  return testimony;
}

export async function updateTestimony(data: FormData) {
  const id = data.get("id") as string;
  const full_name = data.get("full_name") as string;
  const title = data.get("title") as string;
  const testimony = data.get("testimony") as string;
  const image_url = data.get("image_url") as string;
  const stars = Number(data.get("stars") as string);

  const testi = await db.testimony.update({
    where: {
      id,
    },

    data: {
      full_name,
      title,
      testimony,
      image_url,
      stars,
    },
  });

  revalidatePath("/testimonial/list");
  redirect("/testimonial/list");
}
