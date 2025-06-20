import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow } from "date-fns";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const sinceDate = (date: Date) =>
    formatDistanceToNow(date, {
        addSuffix: true,
    });
