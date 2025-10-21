import { SiteConfig } from "@/types"

import { env } from "@/env.mjs"

export const siteConfig: SiteConfig = {
  name: "rdev",
  author: "redpangilinan",
  description: "My personal website built in Nextjs.",
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpg`,
  links: {
    github: "https://github.com/redpangilinan",
    facebook: "https://facebook.com/redpangilinan15",
    twitter: "https://twitter.com/redpngilinan",
    linkedin: "https://www.linkedin.com/in/jan-reynald-pangilinan",
  },
}
