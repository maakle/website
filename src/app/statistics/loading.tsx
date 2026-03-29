import { HeadingText } from "@/components/common/heading-text"
import { StatisticSkeleton } from "@/components/loaders/statistics-skeleton"

export default function Loading() {
  return (
    <main className="items-center px-4 py-8">
      <div className="space-y-4">
        <HeadingText subtext="Statistics about my programming and fitness">
          Statistics
        </HeadingText>
        <StatisticSkeleton />
      </div>
    </main>
  )
}
