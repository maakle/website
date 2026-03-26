import GitHubCalendar from "react-github-calendar"

import { Card } from "@/components/ui/card"
import { HeadingText } from "@/components/common/heading-text"
import { StatisticSkeleton } from "@/components/loaders/statistics-skeleton"

export const metadata = {
  title: "Statistics",
  description: "Statistics about my programming",
}


export default async function Stats() {

  return (
    <main className="items-center px-4 py-8">
      <div className="space-y-4">
        <HeadingText subtext="Statistics about my programming">
          Statistics
        </HeadingText>
        <div className="flex flex-wrap gap-2">
          <Card className="w-full p-3">
            <GitHubCalendar
              username="maakle"
              fontSize={12}
              blockMargin={3}
              blockSize={10}
            />
          </Card>
        </div>
      </div>
    </main>
  )
}
