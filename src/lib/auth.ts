import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    trustedOrigins: [
        "http://localhost:4000",
        process.env.APP_URL,
    ].filter((origin): origin is string => Boolean(origin)),

    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "user",
                required: false,
            },
        },
    },

    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
    },
});