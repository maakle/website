import { HeadingText } from "@/components/common/heading-text"
import { DashboardSkeleton } from "@/components/loaders/dashboard-skeleton"

export const metadata = {
  title: "Statistics",
  description: "Statistics about my programming",
}

export default async function Dashboard() {
  return (
    <main className="items-center px-4 py-8">
      <div className="space-y-4">
        <HeadingText subtext="Statistics about my programming">
          Statistics
        </HeadingText>
        <div className="flex flex-wrap gap-2">
          <DashboardSkeleton />
        </div>
      </div>
    </main>
  )
}
