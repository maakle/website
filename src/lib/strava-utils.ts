import type { StravaActivity } from "@/lib/api/strava"

export interface CalendarDay {
  date: string
  minutes: number
  calories: number
  level: 0 | 1 | 2 | 3 | 4
  caloriesLevel: 0 | 1 | 2 | 3 | 4
}

export interface MonthlyCount {
  month: string
  count: number
}

export interface RecentActivity {
  name: string
  type: string
  distance: string
  movingTime: string
  calories: number
  date: string
  icon: string
}

const ACTIVITY_ICONS: Record<string, string> = {
  Run: "\u{1F3C3}",
  Ride: "\u{1F6B4}",
  Swim: "\u{1F3CA}",
  Hike: "\u{1F97E}",
  Walk: "\u{1F6B6}",
  Yoga: "\u{1F9D8}",
  WeightTraining: "\u{1F3CB}\u{FE0F}",
}

function getActivityIcon(type: string): string {
  return ACTIVITY_ICONS[type] ?? "\u{1F3C5}"
}

function formatMovingTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
  }
  return `${m}:${String(s).padStart(2, "0")}`
}

function formatDistance(meters: number): string {
  const km = meters / 1000
  return km >= 1 ? `${km.toFixed(1)} km` : `${Math.round(meters)} m`
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function buildCalendarData(activities: StravaActivity[]): CalendarDay[] {
  const minutesByDate = new Map<string, number>()
  const caloriesByDate = new Map<string, number>()

  for (const activity of activities) {
    const date = activity.start_date_local.slice(0, 10)
    const minutes = Math.round(activity.moving_time / 60)
    const calories = Math.round(activity.kilojoules ?? 0)
    minutesByDate.set(date, (minutesByDate.get(date) ?? 0) + minutes)
    caloriesByDate.set(date, (caloriesByDate.get(date) ?? 0) + calories)
  }

  const days: CalendarDay[] = []
  const today = new Date()
  const oneYearAgo = new Date(today)
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

  for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().slice(0, 10)
    const minutes = minutesByDate.get(dateStr) ?? 0
    const calories = caloriesByDate.get(dateStr) ?? 0
    const level = minutes === 0 ? 0 : minutes < 30 ? 1 : minutes < 60 ? 2 : minutes < 120 ? 3 : 4
    const caloriesLevel = calories === 0 ? 0 : calories < 200 ? 1 : calories < 400 ? 2 : calories < 700 ? 3 : 4
    days.push({ date: dateStr, minutes, calories, level, caloriesLevel })
  }

  return days
}

export function buildMonthlyData(activities: StravaActivity[]): MonthlyCount[] {
  const months: MonthlyCount[] = []
  const now = new Date()

  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const label = d.toLocaleDateString("en-US", { month: "short" })
    const year = d.getFullYear()
    const month = d.getMonth()

    const count = activities.filter((a) => {
      const actDate = new Date(a.start_date_local)
      return actDate.getFullYear() === year && actDate.getMonth() === month
    }).length

    months.push({ month: label, count })
  }

  return months
}

export function buildRecentActivities(
  activities: StravaActivity[],
  caloriesMap?: Map<number, number>,
  limit = 5
): RecentActivity[] {
  return activities
    .sort(
      (a, b) =>
        new Date(b.start_date_local).getTime() -
        new Date(a.start_date_local).getTime()
    )
    .slice(0, limit)
    .map((a) => ({
      name: a.name,
      type: a.type,
      distance: formatDistance(a.distance),
      movingTime: formatMovingTime(a.moving_time),
      calories: caloriesMap?.get(a.id) ?? Math.round(a.kilojoules ?? 0),
      date: formatDate(a.start_date_local),
      icon: getActivityIcon(a.type),
    }))
}

export function totalActivityCount(activities: StravaActivity[]): number {
  return activities.length
}
