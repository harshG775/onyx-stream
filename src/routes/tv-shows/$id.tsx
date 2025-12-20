import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/tv-shows/$id")({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/tv-shows/$id"!</div>
}
