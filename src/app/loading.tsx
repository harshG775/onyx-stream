import { Loader } from "lucide-react";

export default function LoadingPage() {
    return (
        <div className="w-full min-h-96 grid place-items-center">
            <Loader className="animate-spin size-8" />
        </div>
    );
}
