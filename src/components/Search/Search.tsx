import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export default function Search({ className }: { className?: string }) {
    return (
        <div className={cn("grid grid-cols-3 gap-2 p-2", className)}>
            <Sheet>
                <SheetTrigger>Open</SheetTrigger>
                <SheetContent side={"top"}>
                    <SheetHeader>
                        <SheetTitle>Are you absolutely sure?</SheetTitle>
                        <SheetDescription>
                            This action cannot be undone. This will permanently delete your account and remove your data
                            from our servers.
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    );
}
