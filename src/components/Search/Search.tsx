"use client";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Loader, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AppLogo } from "../ui/AppLogo";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDebounce } from "@/hooks/usedebounce";
import Link from "next/link";

export default function Search({ className }: { className?: string }) {
    const [mediaType, setMediaType] = useState<"movie" | "tv" | "person" | "multi">("multi");
    const [query, setQuery] = useState("");
    const [debouncedInput] = useDebounce(query, 500);

    const { isLoading, isError, data } = useQuery({
        queryKey: ["search", debouncedInput, mediaType],
        queryFn: async ({ signal }) => {
            const data = await axios.get(`https://api.themoviedb.org/3/search/${mediaType}`, {
                params: {
                    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                    query: query,
                },
                signal,
            });
            return data?.data;
        },
        enabled: !!debouncedInput && debouncedInput.length > 0,
    });
    const router = useRouter();
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        if (!query) return;
        e.preventDefault();

        router.push("/search?q=" + query);
    };
    return (
        <div className={cn("", className)}>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant={"secondary"} className="flex items-center gap-2 rounded-2xl">
                        <SearchIcon />
                        <span>Search</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side={"top"} className="gap-0">
                    <SheetHeader>
                        <SheetTitle className="mb-2 text-center md:text-left">
                            <div className="flex">
                                <AppLogo className="px-0" />
                            </div>
                        </SheetTitle>
                    </SheetHeader>
                    <form className="px-4 mb-4" onSubmit={handleSearch}>
                        <div className="flex relative">
                            <Label htmlFor="search" className="sr-only">
                                Search
                            </Label>
                            <Input
                                type="text"
                                id="search"
                                placeholder="Search..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="pr-20"
                            />
                            <Button className="rounded-l-none absolute right-0">Search</Button>
                        </div>
                    </form>
                    <div className="flex px-4 mb-2 ">
                        <div className="border rounded-md flex">
                            <Button
                                variant={mediaType === "multi" ? "default" : "ghost"}
                                onClick={() => setMediaType("multi")}
                                className="h-6 rounded-r-none"
                            >
                                All
                            </Button>
                            <Button
                                variant={mediaType === "tv" ? "default" : "ghost"}
                                onClick={() => setMediaType("tv")}
                                className="h-6 rounded-none"
                            >
                                Tv Series
                            </Button>
                            <Button
                                variant={mediaType === "movie" ? "default" : "ghost"}
                                onClick={() => setMediaType("movie")}
                                className="h-6 rounded-l-none"
                            >
                                Movie
                            </Button>
                        </div>
                    </div>
                    <SearchResult isLoading={isLoading} isError={isError} media={data?.results || []} />
                </SheetContent>
            </Sheet>
        </div>
    );
}

type MediaDataType = {
    id: number;
    media_type: "movie" | "tv" | "person" | "multi";
    name: string;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    first_air_date: string;
};
type SearchResultProps = {
    isLoading: boolean;
    isError: boolean;
    media: MediaDataType[];
};
const MEDIA_TYPE = {
    movie: "movies",
    tv: "tv-series",
    person: "person",
    multi: "multi",
};
function SearchResult({ isLoading, isError, media }: SearchResultProps) {
    return (
        <div className="p-4 overflow-auto max-h-96 bg-accent">
            {isLoading ? (
                <div className="flex justify-center gap-2">
                    <Loader className="animate-spin" />
                    <span className="sr-only">Loading</span>
                </div>
            ) : (
                <>
                    {isError && <div className="flex justify-center gap-2 text-destructive">Something went wrong</div>}
                    {media?.length === 0 && (
                        <div className="flex justify-center gap-2 text-muted-foreground">No results</div>
                    )}
                    {media?.map((media) => {
                        if (media.media_type === "person") return null;
                        return (
                            <Link
                                tabIndex={0}
                                key={media.id}
                                className=" odd:bg-background even:bg-accent hover:bg-primary/20 text-secondary-foreground flex gap-2 cursor-pointer p-2 rounded"
                                href={`/${MEDIA_TYPE?.[media.media_type]}/${media.id}`}
                                title={media.overview}
                            >
                                {media.poster_path ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={"https://image.tmdb.org/t/p/w200" + media.poster_path}
                                        alt={media.title}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                ) : (
                                    <div className="w-20 h-20 bg-muted-foreground/20 text-sm rounded flex justify-center items-center">
                                        No Image
                                    </div>
                                )}
                                <div>
                                    <div className="font-bold">{media.name || media.title}</div>
                                    <div className="text-sm font-sans">
                                        {media.release_date || media.first_air_date}
                                    </div>
                                    <div className="text-sm uppercase font-semibold">{media.media_type}</div>
                                </div>
                            </Link>
                        );
                    })}
                </>
            )}
        </div>
    );
}
