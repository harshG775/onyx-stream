import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import Loading from "./routes/loading";

// layouts
import RootLayout from "@/routes/root/layout";
import ErrorBoundary from "./components/appRouter/ErrorBoundary";
import InfoRoute from "./routes/root/[mediaType]/[id]";
// routes
const NotFoundRoute = lazy(() => import("@/routes/not-found"));
const RootRoute = lazy(() => import("@/routes/root"));

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <RootLayout>
                <ErrorBoundary>
                    <Suspense fallback={<Loading />}>
                        <Outlet />
                    </Suspense>
                </ErrorBoundary>
            </RootLayout>
        ),
        children: [
            {
                index: true,
                element: <RootRoute />,
            },
            {
                path: "/:mediaType/:id",
                element: <InfoRoute />,
            },
            {
                path: "*",
                element: <NotFoundRoute />,
            },
        ],
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
