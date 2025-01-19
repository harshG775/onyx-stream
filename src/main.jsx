import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./AppRouter";
import "./globals.css";
import { TanstackQueryProvider, ThemeProvider } from "./components/providers";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <TanstackQueryProvider>
                <AppRouter />
            </TanstackQueryProvider>
        </ThemeProvider>
    </StrictMode>
);
