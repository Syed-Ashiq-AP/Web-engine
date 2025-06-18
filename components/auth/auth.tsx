"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { UserButton } from "@daveyplate/better-auth-ui";
import { useUser } from "./user-context";

const Auth = () => {
    const userContext = useUser();
    if (!userContext) return;
    const { hasSession } = userContext;
    return (
        <div className="flex gap-4">
            {hasSession ? (
                <UserButton variant={"ghost"} />
            ) : (
                <>
                    <Button>
                        <Link href={"/auth/sign-in"}>Login</Link>
                    </Button>
                    <Button variant={"ghost"}>
                        <Link href={"/auth/sign-up"}>Sign Up</Link>
                    </Button>
                </>
            )}
        </div>
    );
};

export default Auth;
