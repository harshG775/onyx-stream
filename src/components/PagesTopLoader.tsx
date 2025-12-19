import { useRouterState } from "@tanstack/react-router"
import { Progress } from "@/components/ui/progress"
import { useEffect, useRef, useState } from "react"

export function PagesTopLoader() {
    const { isLoading } = useRouterState()
    const [value, setValue] = useState(0)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (isLoading) {
            setValue(30)

            timerRef.current = setInterval(() => {
                setValue((prev) => (prev < 90 ? prev + 5 : prev))
            }, 200)
        } else {
            setValue(100)

            if (timerRef.current) {
                clearInterval(timerRef.current)
                timerRef.current = null
            }

            const timeout = setTimeout(() => {
                setValue(0)
            }, 300)

            return () => clearTimeout(timeout)
        }
    }, [isLoading])

    if (!isLoading && value === 0) return null

    return <Progress value={value} className="fixed top-0 left-0 right-0 z-50 h-1 rounded-none" />
}
