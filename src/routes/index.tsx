import { createFileRoute, redirect } from "@tanstack/react-router"
export const Route = createFileRoute("/")({
    beforeLoad: () => {
        throw redirect({
            to: "/home",
            replace: true,
        })
    },
    component: RootPage,
})

function RootPage() {
    return <main className="space-y-4">{/*  */}</main>
}
