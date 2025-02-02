import { constants } from "@/config";
import { useState } from "react";

export default function IframePlayer({ id, mediaType }) {
    const sources = constants.mediaSources;
    const [currentSource, setCurrentSource] = useState(() => sources[0]);
    const finalUrl = currentSource?.url?.replace("${mediaType}", mediaType).replace("${id}", id);

    return (
        <>
            <iframe
                key={finalUrl}
                src={finalUrl}
                referrerPolicy="origin"
                allowFullScreen
                className="w-full h-full aspect-video z-10 bg-background/0 rounded-lg"
            />
            <div className="pt-6 pb-4">
                <div className="flex sm:inline-flex flex-col sm:flex-row gap-0 overflow-hidden">
                    {sources?.map((source, i) => (
                        <button
                            // variant={currentSource.name === source.name ? "default" : "outline"}
                            className={`${
                                currentSource.name === source.name ? "bg-primary" : "bg-accent"
                            }  hover:opacity-80 px-4 py-1 font-bold text-xs rounded-none `}
                            key={i}
                            title={source.name}
                            onClick={() => setCurrentSource(source)}
                        >
                            <div className="line-clamp-1">
                                source-{i + 1} {source.name}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
