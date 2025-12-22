import { useTheme } from "@/components/contexts/theme-provider"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/settings/")({
    component: RouteComponent,
})

function RouteComponent() {
      const { theme, setTheme } = useTheme()

    return (
        <main>
            <h1>Settings</h1>
            <section>
                <h2>Appearance:{theme}</h2>
                <div>
                    <div onClick={()=>setTheme("dark")}>Dark</div>
                    <div onClick={()=>setTheme("light")}>Light</div>
                    <div>System Default</div>
                </div>
            </section>
        </main>
    )
}
