import { Skeleton } from "@/components/ui/skeleton"
import { SocialMediaIcons } from "@/components/common/social-media-icons"
import { Introduction } from "@/components/introduction"

export default function Home() {
  return (
    <main className="py-2">
      <section className="py-4">
        <Introduction />
        <SocialMediaIcons />
      </section>

      <section className="py-4">
        <div className="space-y-4 px-4">
          <div className="text-base text-muted-foreground">
            Coding statistics:
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-28" />
              </div>
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <div className="text-sm">
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
      </section>

      <section className="py-4">
        <div className="space-y-4 px-4">
          <div className="text-base text-muted-foreground">Projects:</div>
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-64" />
                </div>
                <div className="ml-4 flex items-center gap-1">
                  <Skeleton className="h-3 w-3" />
                  <Skeleton className="h-3 w-6" />
                </div>
              </div>
            ))}
          </div>
          <div className="pt-2">
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      </section>
    </main>
  )
}
