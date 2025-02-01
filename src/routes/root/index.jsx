import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router";

function HeaderSection({ data }) {
    return (
        <section className="px-3 py-2">
            <ul>
                {data.map((_item, i) => (
                    <li key={i} className="h-96 w-full animate-pulse bg-gray-600/40">
                        <Link to={""} className="flex h-full gap-2 items-center justify-center ">
                            <div>img</div>
                            <div>item</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
function Section({ title, linkTo, data }) {
    return (
        <section className="mt-4 mb-16 px-3">
            <div className="flex items-center justify-between py-2 pl-2 pr-4">
                <h2 className="font-bold text-2xl">{title}</h2>
                <div>
                    <Button variant="link" asChild>
                        <Link to={linkTo}>More</Link>
                    </Button>
                </div>
            </div>
            <ul className="grid grid-cols-3 sm:grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-2">
                {data.map((_item, i) => (
                    <li key={i} className="w-full aspect-[6/8] animate-pulse bg-gray-600/40 rounded-md">
                        <Link to={""} className="flex h-full items-center justify-center">
                            item
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default function HomePage() {
    const data = Array.from({ length: 20 });
    return (
        <ScrollArea className="h-[calc(100vh-3.5rem)] mt-14 max-w-[96rem] mx-auto ">
            <HeaderSection data={[1]} />
            <Section title={"Movies"} linkTo={"movies"} data={data} />
            <Section title={"TvShows"} linkTo={"tv-shows"} data={data} />
            <Section title={"Anime"} linkTo={"anime"} data={data} />
        </ScrollArea>
    );
}
