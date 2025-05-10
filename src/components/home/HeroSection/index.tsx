"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";

const images = ["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg", "/img5.jpg", "/img6.jpg", "/img7.jpg"];

export default function HeroSection() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel();
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: "keepSnaps",
        dragFree: true,
    });

    const onThumbClick = useCallback(
        (index: number) => {
            if (!emblaMainApi || !emblaThumbsApi) return;
            emblaMainApi.scrollTo(index);
        },
        [emblaMainApi, emblaThumbsApi]
    );

    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return;
        setSelectedIndex(emblaMainApi.selectedScrollSnap());
        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
    }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

    useEffect(() => {
        if (!emblaMainApi) return;
        onSelect();

        emblaMainApi.on("select", onSelect).on("reInit", onSelect);
    }, [emblaMainApi, onSelect]);

    return (
        <div className="relative w-full max-w-5xl mx-auto space-y-4"
        >
            {/* Main Carousel */}
            <div ref={emblaMainRef} className="overflow-hidden rounded-lg">
                <div className="flex touch-pan-y touch-pinch-zoom">
                    {images.map((src, index) => (
                        <Main key={index} index={index} src={src} />
                    ))}
                </div>
            </div>

            {/* Thumbnails Carousel */}
            <div ref={emblaThumbsRef} className="overflow-hidden">
                <div className="flex gap-2 px-2">
                    {images.map((src, index) => (
                        <Thumb
                            key={index}
                            onClick={() => onThumbClick(index)}
                            selected={index === selectedIndex}
                            index={index}
                            src={src}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

type MainPropsType = {
    index: number;
    src: string;
};

export const Main: React.FC<MainPropsType> = ({ index, src }) => {
    return (
        <div className="flex-[0_0_100%] h-96 min-w-0 border-2 border-primary" role="group">
            <Image
                src={src}
                alt={`Image ${index}`}
                width={800}
                height={500}
                className="w-full h-auto object-cover rounded-lg"
            />
        </div>
    );
};

type ThumbPropType = {
    selected: boolean;
    index: number;
    onClick: () => void;
    src: string;
};

export const Thumb: React.FC<ThumbPropType> = (props) => {
    const { selected, index, onClick, src } = props;
    return (
        <div
            className={cn(
                "flex-[0_0_40%] sm:flex-[0_0_30%] md:flex-[0_0_30%] lg:flex-[0_0_20%] xl:flex-[0_0_15%]",
                "transition border-2 rounded-md overflow-hidden",
                selected ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
            )}
            onClick={onClick}
        >
            <button key={index}>
                <Image src={src} alt={`Thumbnail ${index}`} width={100} height={60} className="object-cover" />
            </button>
        </div>
    );
};
