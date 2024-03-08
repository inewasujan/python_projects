import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const testimony = await db.testimony.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json({ testimony });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.error();
  }
}
