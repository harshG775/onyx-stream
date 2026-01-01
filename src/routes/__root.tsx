import { HeadContent, Scripts, createRootRouteWithContext } from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { TanStackDevtools } from "@tanstack/react-devtools"

import TanStackQueryDevtools from "../integrations/tanstack-query/devtools"

import appCss from "../styles.css?url"

import { TopNavbar } from "./-components/top-navbar"
import { TabBar } from "./-components/tab-navigation/tab-bar"
import type { QueryClient } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/sonner"
import { PagesTopLoader } from "@/components/PagesTopLoader"
import { ThemeProvider } from "@/components/contexts/theme-provider"
import { getThemeServerFn } from "@/lib/server-fn/theme"
import { Footer } from "./-components/footer"

interface MyRouterContext {
    queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    loader: async ({ location }) => {
        const theme = await getThemeServerFn()
        return { host: location.url.origin, theme }
    },
    head: ({ loaderData }) => {
        const title = "OnyxStream – Watch Movies & TV Shows Online"
        const description =
            "Stream the latest movies and TV shows on OnyxStream. Discover trending, popular, and top-rated content in one place."

        const image = `${loaderData?.host}/logo.png`

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
                { property: "og:type", content: "website" },
                { property: "og:title", content: title },
                { property: "og:description", content: description },
                { property: "og:image", content: image },
                { property: "og:url", content: url },

                // Twitter
                { name: "twitter:card", content: "summary_large_image" },
                { name: "twitter:title", content: title },
                { name: "twitter:description", content: description },
                { name: "twitter:image", content: image },
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
    const { theme } = Route.useLoaderData()

    return (
        <html lang="en" className={theme} suppressHydrationWarning>
            <head>
                <HeadContent />
            </head>
            <body className="relative">
                <PagesTopLoader />
                <TopNavbar />
                <TabBar />
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
                <Footer/>
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
