import type { RecentActivity } from "@/lib/strava-utils"

interface Props {
  activities: RecentActivity[]
}

export function RecentActivities({ activities }: Props) {
  if (activities.length === 0) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        No recent activities
      </p>
    )
  }

  return (
    <div>
      <h3 className="mb-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
        Recent activities
      </h3>
      <div className="flex flex-col gap-1">
        {activities.map((activity, i) => (
          <div
            key={`${activity.date}-${activity.name}`}
            className={`flex items-center justify-between rounded-lg px-3 py-2 ${
              i === 0
                ? "bg-orange-50 dark:bg-orange-950/30"
                : "bg-zinc-50 dark:bg-zinc-800/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{activity.icon}</span>
              <div>
                <div className="text-sm font-medium">{activity.name}</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  {activity.date}
                </div>
              </div>
            </div>
            <div className="text-right text-xs text-zinc-500 dark:text-zinc-400">
              <div>{activity.distance}</div>
              <div>{activity.movingTime}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
