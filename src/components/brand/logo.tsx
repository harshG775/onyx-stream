import { cn } from "@/lib/utils"

type LogoProps = {
    variant?: "icon" | "full"
    size?: "sm" | "md" | "lg"
    className?: string
}

const sizeMap = {
    sm: { container: "h-8", icon: "w-8 h-8", text: "text-lg" },
    md: { container: "h-10", icon: "w-10 h-10", text: "text-xl" },
    lg: { container: "h-12", icon: "w-12 h-12", text: "text-2xl" },
}

export function Logo({ variant = "full", size = "md", className }: LogoProps) {
    const { container, icon, text } = sizeMap[size]
    const showText = variant === "full"

    return (
        <span className={cn("group inline-flex items-end gap-1 font-bold select-none", container, className)}>
            <div className={cn("relative shrink-0", icon)}>
                <img
                    src="/logo-dark.png"
                    alt="Onyx Stream"
                    className="hidden dark:block w-full h-full object-contain rounded-full"
                />
                <img
                    src="/logo-light.png"
                    alt="Onyx Stream"
                    className="block dark:hidden w-full h-full object-contain rounded-full"
                />
            </div>

            {showText && (
                <span className={cn("whitespace-nowrap leading-none", text)}>
                    <span className="text-primary">Onyx</span>
                    <span className="text-foreground">Stream</span>
                </span>
            )}
        </span>
    )
}
