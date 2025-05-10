import Image from "next/image";
import { cn } from "@/lib/utils";
import { CarouselContent, CarouselItem, CarouselThumbContent, CarouselThumbItem, ThumbCarousel } from "./ThumbCarousel";

const images = ["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg", "/img5.jpg", "/img6.jpg", "/img7.jpg"];

type HeroSectionPropsType = {
    className?: string;
};
export default function HeroSection({ className }: HeroSectionPropsType) {
    return (
        <ThumbCarousel className={cn("w-full max-w-7xl mx-auto space-y-4", className)}>
            <CarouselContent>
                {Array.from({ length: images.length }).map((_, index) => (
                    <CarouselItem key={index}>
                        <Image src={images[index]} alt={`Image ${index}`} width={500} height={400} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselThumbContent>
                {Array.from({ length: images.length }).map((_, index) => (
                    <CarouselThumbItem key={index} index={index}>
                        <Image src={images[index]} alt={`Image ${index}`} width={100} height={100} className="rounded border border-primary w-full"/>
                    </CarouselThumbItem>
                ))}
            </CarouselThumbContent>
        </ThumbCarousel>
    );
}
