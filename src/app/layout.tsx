import "@/styles/globals.css"

import { Metadata, Viewport } from "next"
import dynamic from "next/dynamic"
import { Inter } from "next/font/google"
import { GoogleAnalytics } from "@next/third-parties/google"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import Footer from "@/components/layout/footer"
import Navbar from "@/components/layout/navbar"
import { ThemeProvider } from "@/components/theme-provider"

import { PHProvider } from "./providers"

const PostHogPageView = dynamic(() => import("./PostHogPageView"), {
  ssr: false,
})

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Radix UI",
    "shadcn/ui",
    "React Query",
    "Portfolio",
  ],
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@_rdev7",
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <PHProvider>
        <body
          className={cn(
            "bg-background text-zinc-800 antialiased dark:text-zinc-200",
            inter.className
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <div className="flex min-h-screen flex-col px-4 py-4 md:container md:w-[45rem] md:px-0 md:py-8">
              <Navbar />
              <SpeedInsights />
              <Analytics />
              <PostHogPageView />
              <GoogleAnalytics
                gaId={process.env.NEXT_PUBLIC_GOOGLE_TAG_ID ?? ""}
              />
              {children}
              <Footer />
            </div>
          </ThemeProvider>
        </body>
      </PHProvider>
    </html>
  )
}
