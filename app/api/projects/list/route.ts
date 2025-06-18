import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        if (!id)
            return NextResponse.json(
                { message: "Missing fields", success: false },
                { status: 500 }
            );
        const projects = await prisma.project.findMany({
            where: { userId: id },
        });
        if (projects) {
            return NextResponse.json(
                { projects: JSON.stringify(projects), success: true },
                { status: 201 }
            );
        }
        return NextResponse.json(
            { message: "failed", success: false },
            { status: 500 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: error, success: false },
            { status: 500 }
        );
    }
};
