import { HeadContent, Scripts, createRootRouteWithContext } from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { TanStackDevtools } from "@tanstack/react-devtools"

import TanStackQueryDevtools from "../integrations/tanstack-query/devtools"

import appCss from "../styles.css?url"

import type { QueryClient } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/sonner"
import { PagesTopLoader } from "@/components/PagesTopLoader"
import { TopNavbar } from "./-components/top-navbar"
interface MyRouterContext {
    queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    head: () => ({
        meta: [
            {
                charSet: "utf-8",
            },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            {
                title: "OnyxStream",
            },
        ],
        links: [
            {
                rel: "stylesheet",
                href: appCss,
            },
        ],
    }),

    shellComponent: RootDocument,
    notFoundComponent: () => {
        return <p>page doesn't exist!</p>
    },
})

function RootDocument({ children }: { children: React.ReactNode }) {

    return (
        <html lang="en">
            <head>
                <HeadContent />
            </head>
            <body>
                <PagesTopLoader />
                <TopNavbar />
                {children}
                <Toaster richColors={true} />
                <TanStackDevtools
                    config={{
                        position: "bottom-right",
                    }}
                    plugins={[
                        {
                            name: "Tanstack Router",
                            render: <TanStackRouterDevtoolsPanel />,
                        },
                        TanStackQueryDevtools,
                    ]}
                />
                <Scripts />
            </body>
        </html>
    )
}
