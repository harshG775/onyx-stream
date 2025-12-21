import { createFileRoute } from "@tanstack/react-router"
import { FlatList } from "@/components/flat-list"
export const Route = createFileRoute("/test")({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <main>
            <div className="space-y-4">
                <FlatList
                    title="Trending Movies"
                    data={Array.from({ length: 20 })}
                    renderItem={() => {
                        return (
                            <div className="h-full shadow-2xl rounded-xl grid place-content-center bg-accent">
                                {/*  */}
                            </div>
                        )
                    }}
                    itemClassName="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
                />
            </div>
        </main>
    )
}
