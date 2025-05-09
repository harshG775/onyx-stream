"use client";
import { useEffect, useState } from "react";
import { Progress } from "./progress";
import { usePathname } from "next/navigation";

export default function ProgressBar() {
    const pathname = usePathname();
    const [isTransitioning, setIsTransitioning] = useState(true);

    useEffect(() => {
        setIsTransitioning(true);

        setTimeout(() => {
            setIsTransitioning(false);
        }, 300);
    }, [pathname]);

    return (
        <div className="fixed top-0 left-0 w-full h-1 z-[999] bg-background">
            {isTransitioning && <Progress value={40} className="rounded-none" />}
        </div>
    );
}
