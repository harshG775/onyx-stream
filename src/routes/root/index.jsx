import HeaderSection from "@/components/home/HeaderSection";
import Section from "@/components/home/Section";
import { ScrollArea } from "@/components/ui/scroll-area";
import { constants } from "@/config";
import { axiosTMDBInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
const { imageBaseUrl } = constants.TMDB;

function MoviesSection() {
    const handleFetch = async () => {
        const response = await axiosTMDBInstance.get(`/movie/now_playing?language=en-US`);
        return response.data.results.map((item) => ({
            title: item.title,
            id: item.id,
            imgUrl: `${imageBaseUrl}/w500${item.poster_path}`,
            mediaType: "movies",
        }));
    };
    const { data, isSuccess, isLoading, isError } = useQuery({
        queryKey: ["Movies"],
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
        const response = await axiosTMDBInstance.get(`/trending/tv/day?language=en-US`);

        return response.data.results.map((item) => ({
            title: item.name,
            id: item.id,
            imgUrl: `${imageBaseUrl}/w500${item.poster_path}`,
            mediaType: "tv-shows",
        }));
    };
    const { data, isSuccess, isLoading, isError } = useQuery({
        queryKey: ["tvShows"],
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
    const { data, isSuccess, isLoading, isError } = {
        data: Array.from({ length: 20 }),
        isSuccess: null,
        isLoading: true,
        isError: false,
    };
    return (
        <Section
            title={"Anime"}
            linkTo={"anime"}
            isSuccess={isSuccess}
            isLoading={isLoading}
            isError={isError}
            data={data}
        />
    );
}

export default function HomePage() {
    return (
        <ScrollArea className="h-[calc(100vh-3.5rem)] mt-14">
            <main className="max-w-[96rem] mx-auto ">
                <HeaderSection data={[1]} />
                <MoviesSection />
                <TvShowsSection />
                <AnimeSection />
            </main>
        </ScrollArea>
    );
}
