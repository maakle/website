import { Languages as LanguagesType } from "@/types"
import GitHubCalendar from "react-github-calendar"

import { getCodingStats } from "@/lib/api/wakatime"
import { Card } from "@/components/ui/card"
import { HeadingText } from "@/components/common/heading-text"
import { DashboardSkeleton } from "@/components/loaders/dashboard-skeleton"
import { CodeTime } from "@/components/statistics/code-time"
import { Languages } from "@/components/statistics/languages"

export const metadata = {
  title: "Statistics",
  description: "Statistics about my programming",
}

interface ResponseData {
  data: {
    human_readable_range: string
    human_readable_total_including_other_language: string
    languages: LanguagesType[]
  }
  error?: string
}

export default async function Stats() {
  const data = (await getCodingStats()) as ResponseData

  if (!data || data.error) {
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

  const started = data.data.human_readable_range
  const totalTime = data.data.human_readable_total_including_other_language
  const languages: LanguagesType[] = data.data.languages

  return (
    <main className="items-center px-4 py-8">
      <div className="space-y-4">
        <HeadingText subtext="Statistics about my programming">
          Statistics
        </HeadingText>
        <div className="flex flex-wrap gap-2">
          <CodeTime
            started={started}
            totalTime={totalTime}
            languages={languages}
          />
          <Card className="w-full p-3">
            <GitHubCalendar
              username="maakle"
              fontSize={12}
              blockMargin={3}
              blockSize={10}
            />
          </Card>
          <Languages languages={languages} />
        </div>
      </div>
    </main>
  )
}
