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
    loader: async ({ location }) => {
        return { host: location.url.origin }
    },
    head: async ({ loaderData }) => {
        const title = "OnyxStream – Watch Movies & TV Shows Online"
        const description =
            "Stream the latest movies and TV shows on OnyxStream. Discover trending, popular, and top-rated content in one place."

        const poster = "branding/logo/logo-icon.svg"

        const url = `${loaderData?.host}`

        return {
            meta: [
                {
                    charSet: "utf-8",
                },
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1",
                },
                // SEO
                { title: title },
                { name: "description", content: description },
                {
                    name: "keywords",
                    content: "movies, tv shows, streaming, watch online, latest movies, series, OnyxStream",
                },

                // Open Graph
                { property: "og:type", content: "video.movie" },
                { property: "og:title", content: title },
                { property: "og:description", content: description },
                { property: "og:image", content: poster },
                { property: "og:url", content: url },

                // Twitter
                { name: "twitter:card", content: "summary_large_image" },
                { name: "twitter:title", content: title },
                { name: "twitter:description", content: description },
                { name: "twitter:image", content: poster },
                { name: "twitter:url", content: url },
            ],
            links: [
                {
                    rel: "stylesheet",
                    href: appCss,
                },
            ],
        }
    },

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
