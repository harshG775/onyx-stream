import { AppLogo } from "@/components/ui/AppLogo";

export default function LoadingPage() {
    return (
        <div className="flex items-center justify-center bg-background h-dvh fixed inset-0 z-50">
            <AppLogo className="animate-pulse [&>svg]:w-12 [&>svg]:h-12" />
        </div>
    );
}
