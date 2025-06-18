import { betterAuth } from "better-auth";
import { PrismaClient } from "./generated/prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";

const clientId = process.env.GITHUB_CLIENT_ID as string;
const clientSecret = process.env.GITHUB_SECRET as string;

const prisma = new PrismaClient();
export const auth = betterAuth({
    user: {
        fields: {
            name: undefined,
        },
    },
    emailAndPassword: { enabled: true },
    socialProviders: {
        github: {
            clientId,
            clientSecret,
        },
    },
    database: prismaAdapter(prisma, {
        provider: "mongodb",
        advanced: {
            generateId: false,
        },
    }),
});
