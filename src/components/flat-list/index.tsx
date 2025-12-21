import * as React from "react"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, useCarousel } from "@/components/ui/carousel"
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type FlatListProps<T> = {
    title: string
    data: T[]
    renderItem: (item: T, idx: number | string) => React.ReactNode

    /** slots */
    startItem?: () => React.ReactNode
    endItem?: () => React.ReactNode

    /** layout */
    itemClassName?: string
    contentClassName?: string
    headerClassName?: string

    /** behavior */
    dragFree?: boolean
    showControls?: boolean
}

export function FlatList<T>({
    title,
    data,
    renderItem,
    startItem,
    endItem,
    dragFree = true,
    showControls = true,
    itemClassName,
    contentClassName,
    headerClassName,
}: FlatListProps<T>) {
    return (
        <section>
            <Carousel
                opts={{ dragFree }}
                plugins={[
                    WheelGesturesPlugin({
                        forceWheelAxis: "x",
                    }),
                ]}
            >
                <div className={cn("px-3 sm:px-4 lg:px-6 flex items-center justify-between", headerClassName)}>
                    <h2 className="scroll-m-20 text-xl sm:text-2xl font-semibold tracking-tight">{title}</h2>

                    {showControls && (
                        <div className="flex items-center gap-1 font-semibold">
                            <CarouselPrevious />
                            <span className="text-sm opacity-80">Swipe</span>
                            <CarouselNext />
                        </div>
                    )}
                </div>

                <CarouselContent className={cn("px-3 sm:px-4 lg:px-6 py-3 -ml-3 min-h-56", contentClassName)}>
                    {startItem && (
                        <CarouselItem
                            className={cn("pl-3", itemClassName)}
                        >
                            {startItem()}
                        </CarouselItem>
                    )}
                    {data.map((item, idx) => (
                        <CarouselItem
                            key={idx}
                            className={cn("pl-3", itemClassName)}
                        >
                            {renderItem(item, idx)}
                        </CarouselItem>
                    ))}
                    {endItem && (
                        <CarouselItem
                            className={cn("pl-3", itemClassName)}
                        >
                            {endItem()}
                        </CarouselItem>
                    )}
                </CarouselContent>
            </Carousel>
        </section>
    )
}
function CarouselPrevious() {
    const { scrollPrev, canScrollPrev } = useCarousel()

    return (
        <Button variant="ghost" size="icon" disabled={!canScrollPrev} onClick={scrollPrev}>
            <ChevronLeft />
            <span className="sr-only">Previous slide</span>
        </Button>
    )
}

function CarouselNext() {
    const { scrollNext, canScrollNext } = useCarousel()

    return (
        <Button variant="ghost" size="icon" disabled={!canScrollNext} onClick={scrollNext}>
            <ChevronRight />
            <span className="sr-only">Next slide</span>
        </Button>
    )
}
