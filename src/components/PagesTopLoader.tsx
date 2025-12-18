import { useRouterState } from "@tanstack/react-router"
import { Progress } from "./ui/progress"

export function PagesTopLoader() {
    const { isLoading } = useRouterState()
    if (!isLoading) {
        return null
    }

    return <Progress value={33} className="absolute top-0 left-0 right-0" />
}
