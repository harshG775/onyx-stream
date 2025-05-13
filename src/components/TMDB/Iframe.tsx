"use client";
import React, { useState } from "react";
import { getEmbedUrl, getAllProviders, isValidProvider, Provider, MediaType } from "@/lib/getEmbedUrl";

interface TMDBIframeProps {
    tmdbId: number;
    type?: MediaType;
    season?: number;
    episode?: number;
    defaultProvider?: Provider;
    className?: string;
    width?: string;
    height?: string;
    apiKey?: string;
}

const TMDBIframe: React.FC<TMDBIframeProps> = ({
    tmdbId,
    type = "tv",
    season,
    episode,
    defaultProvider = "vidsrc",
    className = "w-full h-full aspect-video bg-secondary",
    width = "100%",
    height = "100%",
}) => {
    const providers = getAllProviders();
    const [currentProvider, setCurrentProvider] = useState<Provider>(
        isValidProvider(defaultProvider) ? defaultProvider : "vidsrc"
    );

    const embedUrl = getEmbedUrl(currentProvider, {
        tmdbId,
        type,
        season,
        episode,
    });

    return (
        <div className="w-full">
            <iframe
                key={`${tmdbId}-${currentProvider}-${season}-${episode}`}
                src={embedUrl}
                referrerPolicy="origin"
                allowFullScreen
                width={width}
                height={height}
                className={className}
            />
            <div className="flex items-center justify-between mb-2">
                <div className="flex flex-wrap gap-2">
                    {providers.map((provider) => (
                        <button
                            key={provider}
                            onClick={() => setCurrentProvider(provider)}
                            className={`text-xs px-3 py-1 border border-input transition-colors hover:opacity-80 ${
                                provider === currentProvider ? "bg-primary text-primary-foreground" : ""
                            }`}
                        >
                            {provider}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TMDBIframe;
