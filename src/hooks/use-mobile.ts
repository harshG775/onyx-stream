import * as React from "react";

// Define breakpoints for different screen sizes
export const BREAKPOINTS = {
    xs: 320,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
} as const;

// Define device orientation types
export type Orientation = "portrait" | "landscape";

// Define screen size types based on breakpoints
export type ScreenSize = keyof typeof BREAKPOINTS | "unknown";

/**
 * Type-safe debounce utility function
 * @param fn - Function to debounce
 * @param ms - Debounce delay in milliseconds
 * @returns Debounced function with the same signature as the input function
 */
function createDebounce<T extends (...args: unknown[]) => unknown>(
    fn: T,
    ms: number
): (...args: Parameters<T>) => void {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
    };
}

/**
 * Custom hook for detecting if the screen is mobile based on width
 * @param customBreakpoint - Optional custom breakpoint (defaults to md breakpoint)
 * @param debounceTime - Optional debounce time in ms (defaults to 200ms)
 * @returns Whether the current screen size is mobile
 */
export function useIsMobile(customBreakpoint: number = BREAKPOINTS.md, debounceTime = 200) {
    const breakpoint = customBreakpoint || BREAKPOINTS.md;
    const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

    React.useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

        const checkIsMobile = (): boolean => window.innerWidth < breakpoint;

        const onChange = createDebounce((): void => {
            setIsMobile(checkIsMobile());
        }, debounceTime);

        // Initial check
        setIsMobile(checkIsMobile());

        // Add event listeners
        mql.addEventListener("change", onChange);
        window.addEventListener("resize", onChange);

        // Cleanup event listeners
        return () => {
            mql.removeEventListener("change", onChange);
            window.removeEventListener("resize", onChange);
        };
    }, [breakpoint, debounceTime]);

    return !!isMobile;
}

/**
 * Custom hook that provides the current screen size based on defined breakpoints
 * @param debounceTime - Optional debounce time in ms (defaults to 200ms)
 * @returns Current screen size label (xs, sm, md, lg, xl, xxl)
 */
export function useScreenSize(debounceTime = 200) {
    const [screenSize, setScreenSize] = React.useState<ScreenSize>("unknown");

    React.useEffect(() => {
        const determineScreenSize = (): ScreenSize => {
            const width = window.innerWidth;

            if (width < BREAKPOINTS.xs) return "unknown";
            if (width < BREAKPOINTS.sm) return "xs";
            if (width < BREAKPOINTS.md) return "sm";
            if (width < BREAKPOINTS.lg) return "md";
            if (width < BREAKPOINTS.xl) return "lg";
            if (width < BREAKPOINTS.xxl) return "xl";
            return "xxl";
        };

        const onChange = createDebounce((): void => {
            setScreenSize(determineScreenSize());
        }, debounceTime);

        // Initial check
        setScreenSize(determineScreenSize());

        // Add event listener
        window.addEventListener("resize", onChange);

        // Cleanup event listener
        return () => window.removeEventListener("resize", onChange);
    }, [debounceTime]);

    return screenSize;
}

/**
 * Custom hook that detects device orientation
 * @param debounceTime - Optional debounce time in ms (defaults to 200ms)
 * @returns Current orientation (portrait or landscape)
 */
export function useOrientation(debounceTime = 200) {
    const [orientation, setOrientation] = React.useState<Orientation>("portrait");

    React.useEffect(() => {
        const determineOrientation = (): Orientation => {
            return window.innerWidth > window.innerHeight ? "landscape" : "portrait";
        };

        const onChange = createDebounce((): void => {
            setOrientation(determineOrientation());
        }, debounceTime);

        // Initial check
        setOrientation(determineOrientation());

        // Add event listeners
        window.addEventListener("resize", onChange);

        // For mobile devices with orientation change event
        if (window.screen && window.screen.orientation) {
            window.screen.orientation.addEventListener("change", onChange);
        } else {
            window.addEventListener("orientationchange", onChange);
        }

        // Cleanup event listeners
        return () => {
            window.removeEventListener("resize", onChange);

            if (window.screen && window.screen.orientation) {
                window.screen.orientation.removeEventListener("change", onChange);
            } else {
                window.removeEventListener("orientationchange", onChange);
            }
        };
    }, [debounceTime]);

    return orientation;
}

/**
 * Custom hook that combines multiple responsive features
 * @param customBreakpoint - Optional custom mobile breakpoint
 * @param debounceTime - Optional debounce time in ms (defaults to 200ms)
 * @returns Object with multiple responsive properties
 */
export function useResponsive(customBreakpoint?: number, debounceTime = 200) {
    const isMobile = useIsMobile(customBreakpoint, debounceTime);
    const screenSize = useScreenSize(debounceTime);
    const orientation = useOrientation(debounceTime);

    // Additional computed properties
    const isPortrait = orientation === "portrait";
    const isLandscape = orientation === "landscape";
    const isTablet = screenSize === "sm" || screenSize === "md";
    const isDesktop = screenSize === "lg" || screenSize === "xl" || screenSize === "xxl";

    return {
        isMobile,
        screenSize,
        orientation,
        isPortrait,
        isLandscape,
        isTablet,
        isDesktop,
        breakpoints: BREAKPOINTS,
    };
}
