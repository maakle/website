import { Suspense } from "react"

import { SocialMediaIcons } from "@/components/common/social-media-icons"
import { Introduction } from "@/components/introduction"

import { CodingStats } from "./coding-stats"
import { Projects } from "./projects"

export default function Home() {
  return (
    <main className="py-2">
      <section className="py-4">
        <Introduction />
        <SocialMediaIcons />
      </section>
      <Suspense
        fallback={
          <section className="py-4">
            <div className="px-4">
              <p className="text-sm text-muted-foreground">
                Loading coding stats...
              </p>
            </div>
          </section>
        }
      >
        <CodingStats />
      </Suspense>
      <Suspense
        fallback={
          <section className="py-4">
            <div className="px-4">
              <p className="text-sm text-muted-foreground">
                Loading projects...
              </p>
            </div>
          </section>
        }
      >
        <Projects />
      </Suspense>
    </main>
  )
}
