import { cn } from "@/lib/utils"
import { Link } from "@tanstack/react-router"
import { Film, Home, Search, Settings, Tv } from "lucide-react"
import { useEffect, useRef } from "react"

const NAVBAR_HEIGHT = 72

export function TabBar() {
    const tabBarRef = useRef<HTMLDivElement>(null)
    const lastScrollY = useRef(0)
    const translateY = useRef(0)
    const ticking = useRef(false)

    useEffect(() => {
        const onScroll = () => {
            if (ticking.current) return

            ticking.current = true
            requestAnimationFrame(() => {
                const currentScrollY = window.scrollY
                
                const delta = currentScrollY - lastScrollY.current

                translateY.current += delta
                translateY.current = Math.min(Math.max(translateY.current, 0), NAVBAR_HEIGHT)

                if (tabBarRef.current) {
                    tabBarRef.current.style.transform = `translateY(${translateY.current}px)`
                }

                lastScrollY.current = currentScrollY
                ticking.current = false
            })
        }

        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    const tabsArray = [
        { icon: <Home />, label: "Home", path: "/" },
        { icon: <Tv />, label: "Shows", path: "/tv" },
        { icon: <Film />, label: "Movies", path: "/movies" },
        { icon: <Search />, label: "Search", path: "/search" },
        { icon: <Settings />, label: "Settings", path: "/settings" },
    ]

    return (
        <div
            ref={tabBarRef}
            className="z-40 fixed bottom-0 left-0 right-0 pb-2 px-2 flex sm:justify-center
                       will-change-transform transition-transform duration-75"
        >
            <div className="w-full sm:w-auto flex gap-1 justify-evenly bg-card border rounded-md p-1.5">
                {tabsArray.map(({ path, label, icon }, idx) => (
                    <Link
                        key={idx}
                        to={path}
                        className={cn(
                            "flex flex-col sm:flex-row sm:gap-1 items-center justify-center p-1 px-2 rounded-md text-muted-foreground hover:bg-muted-foreground/10",
                            "[&>svg]:w-5",
                        )}
                        activeProps={{
                            className: "text-primary hover:bg-primary/10",
                        }}
                    >
                        {icon}
                        <span className="text-xs">{label}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}
