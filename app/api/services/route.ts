import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const services = await db.services.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json({ services });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.error();
  }
}
