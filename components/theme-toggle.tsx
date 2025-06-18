"use client";
import React, { useCallback } from "react";
import { Toggle } from "./ui/toggle";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    return (
        <Button
            variant={"ghost"}
            title={`Toggle to ${theme === "light" ? "dark" : "light"} mode`}
            onClick={() =>
                setTheme((prev) => (prev === "light" ? "dark" : "light"))
            }
        >
            {theme === "light" && <Sun />}
            {theme === "dark" && <Moon />}
        </Button>
    );
};

export default ThemeToggle;
