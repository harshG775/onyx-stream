import { Button } from "@/components/ui/button";
import { Link } from "react-router";

function _ListItemLoading({ item }) {
    return (
        <li className="w-full aspect-[6/8] animate-pulse bg-gray-600/40 rounded-md overflow-hidden">
            <div className="h-full">
                <img src={item?.imgUrl} alt="" />
            </div>
            <Link to={""} className="flex justify-center">
                <h3 className="line-clamp-1">{item?.title || "."}</h3>
            </Link>
        </li>
    );
}
function ListItem({ item }) {
    return (
        <li className="w-full aspect-[6/8] rounded-md overflow-hidden relative group">
            <Link to={`${item?.mediaType}/${item?.id}`}>
                <img src={item?.imgUrl} alt={item?.mediaType} className=" transition-all duration-300 group-hover:scale-110 group-hover:rotate-2 group-hover:origin-bottom"/>
            </Link>
            <div className="bg-black/30 absolute top-0 left-0 right-0 z-10 p-2">
                <h3 className="line-clamp-1">{item?.title || "."}</h3>
            </div>
        </li>
    );
}
function List({ data }) {
    return (
        <ul className="grid grid-cols-3 sm:grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-2">
            {data?.map((item, i) => (
                <ListItem key={i} item={item} />
            ))}
        </ul>
    );
}

export default function Section({ title, linkTo, isSuccess, isLoading, isError, data }) {
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
            {isLoading && "loading"}
            {isError && "error"}
            {isSuccess && <List data={data} />}
        </section>
    );
}
