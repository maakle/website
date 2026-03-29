import GitHubCalendar from "react-github-calendar"

import { Card } from "@/components/ui/card"
import { HeadingText } from "@/components/common/heading-text"
import { ActivityChart } from "@/components/statistics/activity-chart"
import { RecentActivities } from "@/components/statistics/recent-activities"
import { StravaCalendar } from "@/components/statistics/strava-calendar"
import { getActivities } from "@/lib/api/strava"
import {
  buildCalendarData,
  buildMonthlyData,
  buildRecentActivities,
  totalActivityCount,
} from "@/lib/strava-utils"

export const metadata = {
  title: "Statistics",
  description: "Statistics about my programming and fitness",
}

export default async function Stats() {
  const activities = await getActivities()
  const hasStravaData = activities.length > 0

  const calendarData = buildCalendarData(activities)
  const monthlyData = buildMonthlyData(activities)
  const recentData = buildRecentActivities(activities)
  const total = totalActivityCount(activities)

  return (
    <main className="items-center px-4 py-8">
      <div className="space-y-4">
        <HeadingText subtext="Statistics about my programming and fitness">
          Statistics
        </HeadingText>
        <div className="flex flex-col gap-6">
          <section className="space-y-3">
            <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Github Statistics
            </h2>
            <Card className="w-full p-3">
              <GitHubCalendar
                username="maakle"
                fontSize={12}
                blockMargin={3}
                blockSize={10}
              />
            </Card>
          </section>

          {hasStravaData && (
            <section className="space-y-3">
              <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Strava Statistics
              </h2>
              <div className="flex flex-col gap-4">
                <Card className="w-full p-3">
                  <StravaCalendar data={calendarData} totalActivities={total} />
                </Card>

                <Card className="w-full p-3">
                  <ActivityChart data={monthlyData} />
                </Card>

                <Card className="w-full p-3">
                  <RecentActivities activities={recentData} />
                </Card>
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  )
}
