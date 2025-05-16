"use client";
import { usePopularMovies } from "@/hooks/useTMDB";
import { cn } from "@/lib/utils";
import { PlayCircle } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function TestPage() {
    const { data } = usePopularMovies(1, "en-US");
    const [layout, setLayout] = useState(1); // 1 = grid, 2 = list

    return (
        <main className="max-w-[96rem] mx-auto p-4">
            <div>
                <div className="flex gap-4 justify-end mb-4">
                    <button onClick={() => setLayout(1)}>Grid</button>
                    <button onClick={() => setLayout(2)}>List</button>
                </div>
                {layout == 1 && (
                    <div className={cn("", "grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-4 gap-y-8")}>
                        {data?.results.map((movie) => (
                            <CardItem
                                key={movie.id}
                                href={`/movies/${movie.id}`}
                                data={{
                                    image: `https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`,
                                    title: movie.title,
                                    mediaType: "movie",
                                    genres: movie.genre_ids,
                                    vote_average: movie.vote_average,
                                    release_date: movie.release_date,
                                }}
                            />
                        ))}
                    </div>
                )}
                {layout == 2 && (
                    <div className={cn("", "grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4 gap-y-8")}>
                        {data?.results.map((movie) => (
                            <CardList
                                key={movie.id}
                                href={`/movies/${movie.id}`}
                                data={{
                                    image: `https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`,
                                    title: movie.title,
                                    mediaType: "movie",
                                    genres: movie.genre_ids,
                                    vote_average: movie.vote_average,
                                    release_date: movie.release_date,
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

interface CardItemProps extends React.HTMLAttributes<HTMLDivElement> {
    href: string;
    data: {
        image: string;
        title: string;
        mediaType: string;
        genres: number[];
        vote_average: number;
        release_date: string;
    };
}
function CardItem({ data, href }: CardItemProps) {
    return (
        <Link href={href} className="group">
            <div className="relative overflow-hidden rounded-xl">
                <img
                    src={data.image}
                    alt={data.title}
                    className=" w-full h-64 object-cover group-hover:brightness-50 transition duration-300 scale-100 group-hover:scale-110 group-hover:blur-xs"
                />
                <PlayCircle className="size-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary opacity-0 group-hover:opacity-100 transition duration-300" />
                <div className="absolute top-2 left-2 uppercase text-xs font-bold bg-primary text-primary-foreground rounded py-1 px-2">
                    {data.mediaType}
                </div>
                <div className="absolute bottom-0 left-0 text-xs flex gap-1 flex-wrap p-2">
                    {data.genres.map((genre) => (
                        <span
                            key={genre}
                            className="inline-block bg-accent text-accent-foreground py-0.5 px-1 rounded-lg"
                        >
                            {movieGenreMap[genre]}
                        </span>
                    ))}
                </div>
            </div>
            <div className="mt-2 px-2 pb-2 text-sm">
                <div className="flex gap-2 justify-between items-center">
                    <h2 className="font-bold line-clamp-1 group-hover:text-primary">{data.title}</h2>
                    <div className="font-bold py-1">
                        <span className="text-primary">{data.vote_average.toFixed(1)}</span>/<span>10</span>
                    </div>
                </div>
                <div className="text-xs font-medium text-muted-foreground">{formatDate(data.release_date)}</div>
            </div>
        </Link>
    );
}

function CardList({ href, data }: CardItemProps) {
    return (
        <Link href={href} className="group grid grid-cols-7 shadow-md rounded-md">
            <div className="col-span-3 relative overflow-hidden rounded-xl">
                <img
                    src={data.image}
                    alt={data.title}
                    className=" w-full h-38 object-cover group-hover:brightness-50 transition duration-300 scale-100 group-hover:scale-110 group-hover:blur-xs"
                />
                <PlayCircle className="size-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary opacity-0 group-hover:opacity-100 transition duration-300" />
            </div>
            <div className="col-span-4 mt-2 px-2 pb-2 text-sm flex flex-col">
                <div className="flex gap-2 justify-between items-center">
                    <h2 className="font-bold line-clamp-1 group-hover:text-primary">{data.title}</h2>
                    <div className="font-bold py-1">
                        <span className="text-primary">{data.vote_average.toFixed(1)}</span>/<span>10</span>
                    </div>
                </div>
                <div className="text-xs font-medium text-muted-foreground">{formatDate(data.release_date)}</div>

                <div className="text-xs flex gap-1 flex-wrap p-2">
                    {data.genres.map((genre) => (
                        <span
                            key={genre}
                            className="inline-block bg-accent text-accent-foreground py-0.5 px-1 rounded-lg"
                        >
                            {movieGenreMap[genre]}
                        </span>
                    ))}
                </div>
                <div className="mt-auto uppercase text-xs font-bold bg-primary text-primary-foreground rounded py-1 px-2">
                    {data.mediaType}
                </div>
            </div>
        </Link>
    );
}

const genres: { tv: { id: number; name: string }[]; movie: { id: number; name: string }[] } = {
    tv: [
        { id: 10759, name: "Action & Adventure" },
        { id: 16, name: "Animation" },
        { id: 35, name: "Comedy" },
        { id: 80, name: "Crime" },
        { id: 99, name: "Documentary" },
        { id: 18, name: "Drama" },
        { id: 10751, name: "Family" },
        { id: 10762, name: "Kids" },
        { id: 9648, name: "Mystery" },
        { id: 10763, name: "News" },
        { id: 10764, name: "Reality" },
        { id: 10765, name: "Sci-Fi & Fantasy" },
        { id: 10766, name: "Soap" },
        { id: 10767, name: "Talk" },
        { id: 10768, name: "War & Politics" },
        { id: 37, name: "Western" },
    ],
    movie: [
        { id: 28, name: "Action" },
        { id: 12, name: "Adventure" },
        { id: 16, name: "Animation" },
        { id: 35, name: "Comedy" },
        { id: 80, name: "Crime" },
        { id: 99, name: "Documentary" },
        { id: 18, name: "Drama" },
        { id: 10751, name: "Family" },
        { id: 14, name: "Fantasy" },
        { id: 36, name: "History" },
        { id: 27, name: "Horror" },
        { id: 10402, name: "Music" },
        { id: 9648, name: "Mystery" },
        { id: 10749, name: "Romance" },
        { id: 878, name: "Science Fiction" },
        { id: 10770, name: "TV Movie" },
        { id: 53, name: "Thriller" },
        { id: 10752, name: "War" },
        { id: 37, name: "Western" },
    ],
};
const movieGenreMap = Object.fromEntries(genres.movie.map((g) => [g.id, g.name]));

const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
};
