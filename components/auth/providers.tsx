"use client";

import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

import { authClient } from "@/lib/auth-client";
import { UserProvider } from "./user-context";

export function Providers({ children }: { children: ReactNode }) {
    const router = useRouter();

    return (
        <AuthUIProvider
            authClient={authClient}
            navigate={router.push}
            replace={router.replace}
            social={{ providers: ["github"] }}
            onSessionChange={() => {
                router.refresh();
            }}
            Link={Link}
        >
            <UserProvider>{children}</UserProvider>
        </AuthUIProvider>
    );
}
