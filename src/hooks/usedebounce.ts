import { useEffect, useState } from "react";

export function useDebounce<ValueT>(value: ValueT, delay: number = 500): [ValueT] {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return [debouncedValue];
}



// import { useState, useEffect, useRef } from "react";

// interface DebounceOptions {
//     leading?: boolean;
//     trailing?: boolean;
// }

// function useDebounce<T>(
//     value: T,
//     delay: number = 500,
//     options: DebounceOptions = { leading: false, trailing: true }
// ): T {
//     const { leading, trailing } = options;
//     const [debouncedValue, setDebouncedValue] = useState<T>(value);
//     const timeoutRef = useRef<NodeJS.Timeout>();
//     const isLeadingCalledRef = useRef(false);

//     useEffect(() => {
//         if (leading && !isLeadingCalledRef.current) {
//             // Update immediately on leading edge
//             setDebouncedValue(value);
//             isLeadingCalledRef.current = true;
//         }

//         // Clear existing timeout
//         if (timeoutRef.current) {
//             clearTimeout(timeoutRef.current);
//         }

//         timeoutRef.current = setTimeout(() => {
//             if (trailing) {
//                 // Update after the delay
//                 setDebouncedValue(value);
//             }
//             isLeadingCalledRef.current = false;
//         }, delay);

//         // Cleanup
//         return () => {
//             if (timeoutRef.current) {
//                 clearTimeout(timeoutRef.current);
//             }
//         };
//     }, [value, delay, leading, trailing]);

//     return debouncedValue;
// }