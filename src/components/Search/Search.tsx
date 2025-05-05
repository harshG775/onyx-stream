"use client";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AppLogo } from "../ui/AppLogo";

export default function Search({ className }: { className?: string }) {
    const [query, setQuery] = useState("");
    const router = useRouter();
    const handleDebounseSearch = (queryString: string) => {
        console.log(queryString);
    };
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
                        <Label htmlFor="search">Search</Label>
                        <form className="flex gap-2" onSubmit={handleSearch}>
                            <Input
                                type="text"
                                id="search"
                                placeholder="Search..."
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    handleDebounseSearch(e.target.value);
                                }}
                            />
                            <Button>Search</Button>
                        </form>
                    </SheetHeader>
                    <div className="p-4 overflow-auto max-h-96">
                        {Array.from({ length: 100 }).map((_, i) => (
                            <div key={i}>search result</div>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
