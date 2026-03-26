import { HeadingText } from "@/components/common/heading-text"
import { StatisticSkeleton } from "@/components/loaders/statistics-skeleton"

export const metadata = {
  title: "Statistics",
  description: "Statistics about my programming",
}

export default async function Loading() {
  return (
    <main className="items-center px-4 py-8">
      <div className="space-y-4">
        <HeadingText subtext="Statistics about my programming">
          Statistics
        </HeadingText>
        <div className="flex flex-wrap gap-2">
          <StatisticSkeleton />
        </div>
      </div>
    </main>
  )
}
