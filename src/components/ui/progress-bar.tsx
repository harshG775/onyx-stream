"use client";
import { useEffect, useState } from "react";
import { Progress } from "./progress";

export default function ProgressBar() {
    const [progress, setProgress] = useState(13);

    useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-1 z-[999] bg-background">
            <Progress value={progress} className="rounded-none" />
        </div>
    );
}
