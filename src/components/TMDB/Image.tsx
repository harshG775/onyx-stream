"use client";
import Image from "next/image";
import { useState } from "react";

// Base URL for TMDB images
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

// Available sizes for TMDB images
export type TMDBImageSize =
    // Backdrop sizes
    | "w300"
    | "w780"
    | "w1280"
    | "original"
    // Poster sizes
    | "w92"
    | "w154"
    | "w185"
    | "w342"
    | "w500"
    | "w780";

// Types of TMDB images
export type TMDBImageType = "backdrop" | "poster" | "profile" | "logo";

interface TMDBImageProps {
    path: string | null;
    alt: string;
    size?: TMDBImageSize;
    type?: TMDBImageType;
    width?: number;
    height?: number;
    className?: string;
    fallbackSrc?: string;
    priority?: boolean;
}

/**
 * Custom Image component for TMDB images
 */
export default function TMDBImage({
    path,
    alt,
    size = "w500",
    type = "poster",
    width,
    height,
    className = "",
    fallbackSrc = "/images/placeholder.jpg", // Provide a default placeholder
    priority = false,
}: TMDBImageProps) {
    const [imgSrc, setImgSrc] = useState<string>(() => {
        if (!path) return fallbackSrc;
        return `${TMDB_IMAGE_BASE_URL}${size}${path}`;
    });

    // Handle image loading error
    const handleError = () => {
        setImgSrc(fallbackSrc);
    };

    // Set default dimensions based on image type if not provided
    const getDefaultDimensions = () => {
        if (width && height) return { width, height };

        switch (type) {
            case "backdrop":
                return { width: 1280, height: 720 };
            case "poster":
                return { width: 500, height: 750 };
            case "profile":
                return { width: 300, height: 450 };
            case "logo":
                return { width: 300, height: 100 };
            default:
                return { width: 500, height: 500 };
        }
    };

    const dimensions = getDefaultDimensions();

    return (
        <Image
            src={imgSrc}
            alt={alt}
            width={dimensions.width}
            height={dimensions.height}
            className={`rounded ${className}`}
            onError={handleError}
            priority={priority}
        />
    );
}
