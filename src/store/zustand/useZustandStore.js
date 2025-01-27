import { create } from "zustand";
import { devtools } from "zustand/middleware";
// Utility function for handling state updates
const createUpdater = (set, replace, key) => {
    return (updater) => {
        return set(
            (prevState) => ({
                [key]: typeof updater === "function" ? updater(prevState[key]) : updater,
            }),
            replace,
            { type: key }
        );
    };
};

const useZustandStore = create()(
    devtools(
        (set) => ({
            // Sidebar state
            isSidebarOpen: false,
            setIsSidebarOpen: createUpdater(set, false, "isSidebarOpen"),

            // Chat state
            contentStream: { content: "", status: "idle" },
            setContentStream: (newState) => {
                set(() => {
                    return {
                        contentStream: newState,
                    };
                });
            },
        }),
        { name: "global store" }
    )
);

export default useZustandStore;
