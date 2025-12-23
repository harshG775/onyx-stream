import { useTheme } from "@/components/contexts/theme-provider"
import { cn } from "@/lib/utils"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/settings/")({
    component: RouteComponent,
})

function RouteComponent() {
    const { theme, setTheme } = useTheme()

    return (
        <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 ">
            <main className="p-4 max-w-8xl mx-auto bg-card shadow border rounded-md">
                <h1 className="font-semibold text-xl">Settings</h1>
                <section className="mt-2">
                    <div>
                        <h2 className="font-medium text-lg text-secondary-foreground">Appearance</h2>
                        <div className="h-0.5 bg-border rounded-full my-3" />
                    </div>
                    <div>
                        <div>
                            <div className="font-medium">Color Mode</div>
                            <p className="font-medium text-muted-foreground text-sm">Select Your Default Theme</p>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-4 max-w-sm">
                            <div className="flex-1 h-full aspect-16/10 flex flex-col" onClick={() => setTheme("dark")}>
                                <div
                                    className={cn(
                                        "shadow rounded sm:rounded-md bg-gray-900 flex-1",
                                        theme === "dark" && "border-2 border-primary/60",
                                    )}
                                ></div>
                                <div className="text-center text-sm mt-1">Dark</div>
                            </div>
                            <div className="flex-1 h-full aspect-16/10 flex flex-col" onClick={() => setTheme("light")}>
                                <div
                                    className={cn(
                                        "shadow rounded sm:rounded-md bg-gray-100 flex-1",
                                        theme === "light" && "border-2 border-primary/60",
                                    )}
                                ></div>
                                <div className="text-center text-sm mt-1">Light</div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
