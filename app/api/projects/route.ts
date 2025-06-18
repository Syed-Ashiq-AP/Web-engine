import { Prisma } from "@/lib/generated/prisma";
import prisma from "@/lib/prisma";
import { generateId } from "better-auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const { id, name } = await req.json();
        if (id && name) {
            const project = await prisma.project.create({
                data: {
                    id: generateId(),
                    name,
                    userId: id,
                } as Prisma.ProjectCreateInput,
            });
            if (project)
                return NextResponse.json(
                    { message: "Created", success: true },
                    { status: 201 }
                );
            return NextResponse.json(
                { message: "Something went wrong!", success: false },
                { status: 401 }
            );
        } else {
            return NextResponse.json(
                { message: "Missign fields", success: false },
                { status: 401 }
            );
        }
    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { message: e, success: false },
            { status: 500 }
        );
    }
};
