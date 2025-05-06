"use client";
import { useEffect, useState } from "react";

export default function ProgressBar() {
    const [width, setWidth] = useState(40);

    useEffect(() => {
        const interval = setInterval(() => {
            setWidth((prev) => (prev >= 100 ? 0 : prev + 1));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-0 left-0 w-full h-1 z-[999] bg-background">
            <div
                className="h-full bg-primary transition-all duration-100 ease-linear"
                style={{ width: `${width}%` }}
            ></div>
        </div>
    );
}
