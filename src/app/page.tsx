import HeroSection from "@/components/home/HeroSection";
import { cn } from "@/lib/utils";

export default function Home() {
    return (
        <div className="grid grid-cols-3 gap-2">
            <HeroSection className={"col-span-3"} />
            <section
                className={cn(
                    "col-span-2",
                    "p-2 [&>section]:min-h-96 [&>section]:bg-primary/20 [&>section]:animate-pulse [&>section]:rounded-md "
                )}
            ></section>
            <section></section>
            <section
                className={cn(
                    "col-span-2",
                    "p-2 [&>section]:min-h-96 [&>section]:bg-primary/20 [&>section]:animate-pulse [&>section]:rounded-md "
                )}
            ></section>
            <section></section>
        </div>
    );
}
