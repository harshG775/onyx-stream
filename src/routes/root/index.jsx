import HeaderSection from "@/components/home/HeaderSection";
import Section from "@/components/home/Section";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function MoviesSection() {
    const handleFetch = async () => {
        const response = await axios({
            url: "https://api.themoviedb.org/3/movie/now_playing?language=en-US",
            method: "get",
            headers: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDRjNGQ1ODhlYTA0ZTE1NDI4NDllNWIwM2ZlYWRjOSIsIm5iZiI6MTY0Nzg2Mjg1NC41MjksInN1YiI6IjYyMzg2NDQ2OWVlMGVmMDA0NmRhNTA0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oBGxSzK3gykXoMkyTZ8PTvchWBQaJytbHVat0psQxWo",
            },
        });
        return response.data.results.map((item) => ({
            title: item.title,
            id: item.id,
            imgUrl: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            mediaType: "movies",
        }));
    };
    const { data, isSuccess, isLoading, isError } = useQuery({
        queryKey: ["Movies"], // Include currentPage in queryKey
        queryFn: handleFetch,
        keepPreviousData: true, // Keep previous data while fetching new
    });
    return (
        <Section
            title={"Movies"}
            linkTo={"movies"}
            isSuccess={isSuccess}
            isLoading={isLoading}
            isError={isError}
            data={data}
        />
    );
}
function TvShowsSection() {
    const handleFetch = async () => {
        const response = await axios({
            url: "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
            method: "get",
            headers: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDRjNGQ1ODhlYTA0ZTE1NDI4NDllNWIwM2ZlYWRjOSIsIm5iZiI6MTY0Nzg2Mjg1NC41MjksInN1YiI6IjYyMzg2NDQ2OWVlMGVmMDA0NmRhNTA0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oBGxSzK3gykXoMkyTZ8PTvchWBQaJytbHVat0psQxWo",
            },
        });
        return response.data.results.map((item) => ({
            title: item.title,
            id: item.id,
            imgUrl: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            mediaType: "tv-shows",
        }));
    };
    const { data, isSuccess, isLoading, isError } = useQuery({
        queryKey: ["tvShows"], // Include currentPage in queryKey
        queryFn: handleFetch,
        keepPreviousData: true, // Keep previous data while fetching new
    });
    return (
        <Section
            title={"Tv Show"}
            linkTo={"tv-shows"}
            isSuccess={isSuccess}
            isLoading={isLoading}
            isError={isError}
            data={data}
        />
    );
}
function AnimeSection() {
    const data = Array.from({ length: 20 });
    return <Section title={"Anime"} linkTo={"anime"} data={data} />;
}

export default function HomePage() {
    return (
        <ScrollArea className="h-[calc(100vh-3.5rem)] mt-14 max-w-[96rem] mx-auto ">
            <HeaderSection data={[1]} />
            <MoviesSection />
            <TvShowsSection />
            <AnimeSection />
        </ScrollArea>
    );
}
