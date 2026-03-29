import type { CalendarDay } from "@/lib/strava-utils"

const COLORS = {
  light: ["#ebedf0", "#ffedd5", "#fdba74", "#f97316", "#c2410c"],
  dark: ["#161b22", "#533112", "#874d20", "#b56a2e", "#e8903e"],
}

interface Props {
  data: CalendarDay[]
  totalActivities: number
}

export function StravaCalendar({ data, totalActivities }: Props) {
  // Group days into weeks (columns). Each week has 7 days (Sun-Sat).
  const weeks: CalendarDay[][] = []
  let currentWeek: CalendarDay[] = []

  // Pad the first week with empty days
  const firstDayOfWeek = new Date(data[0]?.date ?? new Date()).getDay()
  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push({ date: "", count: 0, level: 0 })
  }

  for (const day of data) {
    currentWeek.push(day)
    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  }
  if (currentWeek.length > 0) {
    weeks.push(currentWeek)
  }

  // Build month labels from the first day of each month appearing in data
  const monthLabels: { label: string; weekIndex: number }[] = []
  let lastMonth = -1
  for (let wi = 0; wi < weeks.length; wi++) {
    for (const day of weeks[wi]) {
      if (!day.date) continue
      const month = new Date(day.date).getMonth()
      if (month !== lastMonth) {
        lastMonth = month
        const label = new Date(day.date).toLocaleDateString("en-US", {
          month: "short",
        })
        monthLabels.push({ label, weekIndex: wi })
        break
      }
    }
  }

  const cellSize = 10
  const cellGap = 3
  const step = cellSize + cellGap

  return (
    <div className="overflow-x-auto">
      {/* Month labels */}
      <div className="flex text-xs text-zinc-500 dark:text-zinc-400">
        {monthLabels.map(({ label, weekIndex }) => (
          <span
            key={`${label}-${weekIndex}`}
            style={{ position: "relative", left: weekIndex * step }}
            className="absolute"
          >
            {label}
          </span>
        ))}
      </div>

      <svg
        width={weeks.length * step}
        height={7 * step}
        className="mt-5"
        role="img"
        aria-label="Strava activity calendar"
      >
        {weeks.map((week, wi) =>
          week.map((day, di) => (
            <rect
              key={`${wi}-${di}`}
              x={wi * step}
              y={di * step}
              width={cellSize}
              height={cellSize}
              rx={2}
              ry={2}
              className={day.date ? "" : "opacity-0"}
              fill={`var(--strava-level-${day.level})`}
            >
              {day.date && (
                <title>
                  {day.count} {day.count === 1 ? "activity" : "activities"} on{" "}
                  {day.date}
                </title>
              )}
            </rect>
          ))
        )}
      </svg>

      <div className="mt-2 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
        <span>
          {totalActivities} {totalActivities === 1 ? "activity" : "activities"}{" "}
          in the last year
        </span>
        <div className="flex items-center gap-1">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <span
              key={level}
              style={{
                width: cellSize,
                height: cellSize,
                borderRadius: 2,
                display: "inline-block",
                backgroundColor: `var(--strava-level-${level})`,
              }}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      <style>{`
        :root {
          --strava-level-0: ${COLORS.light[0]};
          --strava-level-1: ${COLORS.light[1]};
          --strava-level-2: ${COLORS.light[2]};
          --strava-level-3: ${COLORS.light[3]};
          --strava-level-4: ${COLORS.light[4]};
        }
        .dark {
          --strava-level-0: ${COLORS.dark[0]};
          --strava-level-1: ${COLORS.dark[1]};
          --strava-level-2: ${COLORS.dark[2]};
          --strava-level-3: ${COLORS.dark[3]};
          --strava-level-4: ${COLORS.dark[4]};
        }
      `}</style>
    </div>
  )
}
