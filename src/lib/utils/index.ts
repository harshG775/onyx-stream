import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ClassValue } from "clsx"

export function cn(...inputs: Array<ClassValue>) {
    return twMerge(clsx(inputs))
}

export { formatRuntime, formatDate } from "./formater"
export { sharePage } from "./share"
