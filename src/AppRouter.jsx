import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import Loading from "./routes/loading";

// layouts
import RootLayout from "@/routes/root/layout";
import ErrorBoundary from "./components/appRouter/ErrorBoundary";
// routes
const NotFoundRoute = lazy(() => import("@/routes/not-found"));
const RootRoute = lazy(() => import("@/routes/root"));
const InfoRoute = lazy(() => import("@/routes/root/[mediaType]/[id]"));
const WatchRoute = lazy(() => import("@/routes/root/[mediaType]/watch/[id]"));

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                    <RootLayout>
                        <Outlet />
                    </RootLayout>
                </Suspense>
            </ErrorBoundary>
        ),
        children: [
            {
                index: true,
                element: <RootRoute />,
            },
            {
                path: "/:mediaType",
                element: <Outlet />,
                children: [
                    {
                        path: ":id",
                        element: <InfoRoute />,
                    },
                    {
                        path: "watch/:id",
                        element: <WatchRoute />,
                    },
                ],
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
