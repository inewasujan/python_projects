import {db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export async function GET() {
        try {
            const about = await db.aboutus.findFirst({
                orderBy: {
                    id: 'desc',
                },
            });
    
            return NextResponse.json({ about });
        } catch (error) {
            console.error('Error fetching data:', error);
            return NextResponse.error(); 
        }
    }
