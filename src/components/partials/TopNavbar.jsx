import { AlignLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import useZustandStore from "@/store/zustand/useZustandStore";
export default function TopNavbar({ className }) {
    const { setIsSidebarOpen } = useZustandStore((state) => state);

    return (
        <header className={cn("px-4 py-2 flex gap-2 items-center", className)}>
            <div className={`h-8 w-8 p-0 block`}>
                <Button
                    onClick={() => setIsSidebarOpen((prev) => !prev)}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 p-0 [&_svg]:size-6"
                >
                    <AlignLeft />
                </Button>
            </div>
            <Link to="/" className="flex text-2xl font-bold">
                <div className="italic text-primary">Onyx</div>
                <div>stream</div>
            </Link>
            <nav>
                <ul>
                    <li>
                        <Link to={""}></Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
