import { AlignLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import useZustandStore from "@/store/zustand/useZustandStore";
export default function TopNavbar({ className }) {
    const { isSidebarOpen } = useZustandStore((state) => state);
    const { setIsSidebarOpen } = useZustandStore((state) => state);

    return (
        <header className={cn("px-4 py-2 flex gap-2", className)}>
            <div className={`h-8 w-8 p-0 block ${isSidebarOpen ? "scale-0" : "scale-100"}`}>
                <Button
                    onClick={() => setIsSidebarOpen(true)}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 p-0 [&_svg]:size-6"
                >
                    <AlignLeft />
                </Button>
            </div>
            <div className="flex text-2xl font-bold">
                <div className="italic text-primary">Onyx</div>
                <div>stream</div>
            </div>
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
