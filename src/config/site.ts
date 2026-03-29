import { SiteConfig } from "@/types"

import { env } from "@/env.mjs"

export const siteConfig: SiteConfig = {
  name: "maakle",
  author: "maakle",
  description:
    "Mathias Klenk — Software developer, DJ, and creator. Explore my projects, music, and more.",
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.png`,
  links: {
    github: "https://github.com/maakle",
    twitter: "https://twitter.com/maaklen",
    linkedin: "https://www.linkedin.com/in/mathiasklenk",
  },
}
