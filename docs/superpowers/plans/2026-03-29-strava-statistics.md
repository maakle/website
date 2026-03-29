# Strava Statistics Integration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Strava activity data (heatmap calendar, monthly bar chart, recent activities) to the statistics page.

**Architecture:** Server-side Strava API integration using OAuth2 token refresh, with data fetched in a Next.js server component and cached hourly via `revalidate: 3600`. Three new UI components render the data in a full-width stacked layout below the existing GitHub calendar.

**Tech Stack:** Next.js 15, React 19, TypeScript, wretch (HTTP), recharts (charts), Tailwind CSS, t3-env (env validation)

**Spec:** `docs/superpowers/specs/2026-03-29-strava-statistics-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `src/env.mjs` | Modify | Add 3 Strava env vars |
| `.env.example` | Modify | Add Strava env var placeholders |
| `src/lib/api/strava.ts` | Create | Token refresh + activity fetching |
| `src/lib/strava-utils.ts` | Create | Transform raw activities into calendar, chart, and list data |
| `src/components/statistics/strava-calendar.tsx` | Create | Heatmap calendar (orange, matching GitHub calendar style) |
| `src/components/statistics/activity-chart.tsx` | Create | Recharts monthly bar chart |
| `src/components/statistics/recent-activities.tsx` | Create | Last 5 activities list |
| `src/app/statistics/page.tsx` | Modify | Integrate all new components, stacked layout |
| `src/components/loaders/statistics-skeleton.tsx` | Modify | Update skeleton for new sections |

---

### Task 1: Environment Variables

**Files:**
- Modify: `src/env.mjs`
- Modify: `.env.example`

- [ ] **Step 1: Add Strava env vars to `src/env.mjs`**

Replace the contents of `src/env.mjs` with:

```js
import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    GH_API_URL: z.string().startsWith("https://"),
    STRAVA_CLIENT_ID: z.string().min(1),
    STRAVA_CLIENT_SECRET: z.string().min(1),
    STRAVA_REFRESH_TOKEN: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
  },
  runtimeEnv: {
    GH_API_URL: process.env.GH_API_URL,
    STRAVA_CLIENT_ID: process.env.STRAVA_CLIENT_ID,
    STRAVA_CLIENT_SECRET: process.env.STRAVA_CLIENT_SECRET,
    STRAVA_REFRESH_TOKEN: process.env.STRAVA_REFRESH_TOKEN,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
})
```

- [ ] **Step 2: Add placeholders to `.env.example`**

Append these lines to `.env.example`:

```
STRAVA_CLIENT_ID=
STRAVA_CLIENT_SECRET=
STRAVA_REFRESH_TOKEN=
```

- [ ] **Step 3: Add actual values to `.env.local`**

Add your Strava credentials to `.env.local` (not committed). The refresh token is obtained via the one-time OAuth flow documented in the spec.

- [ ] **Step 4: Commit**

```bash
git add src/env.mjs .env.example
git commit -m "feat: add Strava environment variables"
```

---

### Task 2: Strava API Client

**Files:**
- Create: `src/lib/api/strava.ts`

This module handles OAuth token refresh and fetching activities. It follows the same patterns as `src/lib/api/github.ts` (wretch, error handling, caching).

- [ ] **Step 1: Create `src/lib/api/strava.ts`**

```ts
import { env } from "@/env.mjs"

interface TokenResponse {
  access_token: string
  refresh_token: string
  expires_at: number
}

export interface StravaActivity {
  name: string
  type: string
  sport_type: string
  distance: number
  moving_time: number
  start_date: string
  start_date_local: string
}

async function refreshAccessToken(): Promise<string> {
  const res = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: env.STRAVA_CLIENT_ID,
      client_secret: env.STRAVA_CLIENT_SECRET,
      refresh_token: env.STRAVA_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  })

  if (!res.ok) {
    throw new Error(`Strava token refresh failed: ${res.status}`)
  }

  const data: TokenResponse = await res.json()
  return data.access_token
}

export async function getActivities(): Promise<StravaActivity[]> {
  try {
    const accessToken = await refreshAccessToken()

    const oneYearAgo = Math.floor(Date.now() / 1000) - 365 * 24 * 60 * 60
    const allActivities: StravaActivity[] = []
    let page = 1

    while (true) {
      const res = await fetch(
        `https://www.strava.com/api/v3/athlete/activities?after=${oneYearAgo}&per_page=200&page=${page}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          next: { revalidate: 3600 },
        } as RequestInit
      )

      if (!res.ok) {
        throw new Error(`Strava API error: ${res.status}`)
      }

      const activities: StravaActivity[] = await res.json()
      if (activities.length === 0) break

      allActivities.push(...activities)
      page++
    }

    return allActivities
  } catch (error) {
    console.error("Error fetching Strava activities:", error)
    return []
  }
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No type errors related to strava.ts

- [ ] **Step 3: Commit**

```bash
git add src/lib/api/strava.ts
git commit -m "feat: add Strava API client with token refresh"
```

---

### Task 3: Data Transformation Utilities

**Files:**
- Create: `src/lib/strava-utils.ts`

- [ ] **Step 1: Create `src/lib/strava-utils.ts`**

```ts
import type { StravaActivity } from "@/lib/api/strava"

export interface CalendarDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
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
  const countsByDate = new Map<string, number>()

  for (const activity of activities) {
    const date = activity.start_date_local.slice(0, 10)
    countsByDate.set(date, (countsByDate.get(date) ?? 0) + 1)
  }

  const days: CalendarDay[] = []
  const today = new Date()
  const oneYearAgo = new Date(today)
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

  for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().slice(0, 10)
    const count = countsByDate.get(dateStr) ?? 0
    const level = count === 0 ? 0 : count === 1 ? 1 : count === 2 ? 2 : count === 3 ? 3 : 4
    days.push({ date: dateStr, count, level })
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
      date: formatDate(a.start_date_local),
      icon: getActivityIcon(a.type),
    }))
}

export function totalActivityCount(activities: StravaActivity[]): number {
  return activities.length
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/lib/strava-utils.ts
git commit -m "feat: add Strava data transformation utilities"
```

---

### Task 4: Strava Activity Calendar Component

**Files:**
- Create: `src/components/statistics/strava-calendar.tsx`

A custom heatmap calendar matching the visual style of the GitHub contribution calendar. Uses an orange color scheme. Pure server component — no interactivity needed.

- [ ] **Step 1: Create `src/components/statistics/strava-calendar.tsx`**

```tsx
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
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/components/statistics/strava-calendar.tsx
git commit -m "feat: add Strava activity heatmap calendar component"
```

---

### Task 5: Monthly Activity Chart Component

**Files:**
- Create: `src/components/statistics/activity-chart.tsx`

Uses recharts (already installed). This is a client component because recharts requires browser APIs.

- [ ] **Step 1: Create `src/components/statistics/activity-chart.tsx`**

```tsx
"use client"

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import type { MonthlyCount } from "@/lib/strava-utils"

interface Props {
  data: MonthlyCount[]
}

export function ActivityChart({ data }: Props) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
        Monthly activities (last 12 months)
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            className="fill-zinc-500 dark:fill-zinc-400"
          />
          <YAxis
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            width={30}
            className="fill-zinc-500 dark:fill-zinc-400"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
              fontSize: 12,
            }}
            labelStyle={{ color: "hsl(var(--card-foreground))" }}
            itemStyle={{ color: "hsl(var(--card-foreground))" }}
            formatter={(value: number) => [
              `${value} ${value === 1 ? "activity" : "activities"}`,
            ]}
          />
          <Bar
            dataKey="count"
            fill="#f97316"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/components/statistics/activity-chart.tsx
git commit -m "feat: add monthly activity bar chart component"
```

---

### Task 6: Recent Activities Component

**Files:**
- Create: `src/components/statistics/recent-activities.tsx`

- [ ] **Step 1: Create `src/components/statistics/recent-activities.tsx`**

```tsx
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
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/components/statistics/recent-activities.tsx
git commit -m "feat: add recent activities list component"
```

---

### Task 7: Integrate Into Statistics Page

**Files:**
- Modify: `src/app/statistics/page.tsx`

- [ ] **Step 1: Update `src/app/statistics/page.tsx`**

Replace the full contents with:

```tsx
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
        <div className="flex flex-col gap-4">
          <Card className="w-full p-3">
            <GitHubCalendar
              username="maakle"
              fontSize={12}
              blockMargin={3}
              blockSize={10}
            />
          </Card>

          {hasStravaData && (
            <>
              <Card className="w-full p-3">
                <StravaCalendar data={calendarData} totalActivities={total} />
              </Card>

              <Card className="w-full p-3">
                <ActivityChart data={monthlyData} />
              </Card>

              <Card className="w-full p-3">
                <RecentActivities activities={recentData} />
              </Card>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/app/statistics/page.tsx
git commit -m "feat: integrate Strava components into statistics page"
```

---

### Task 8: Update Loading Skeleton

**Files:**
- Modify: `src/components/loaders/statistics-skeleton.tsx`

- [ ] **Step 1: Update `src/components/loaders/statistics-skeleton.tsx`**

Replace the full contents with:

```tsx
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function StatisticSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Card className="w-full p-3">
        <CardContent className="space-y-2 p-0">
          <Skeleton className="h-[150px] w-full" />
        </CardContent>
      </Card>
      <Card className="w-full p-3">
        <CardContent className="space-y-2 p-0">
          <Skeleton className="h-[150px] w-full" />
        </CardContent>
      </Card>
      <Card className="w-full p-3">
        <CardContent className="space-y-2 p-0">
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
      </Card>
      <Card className="w-full p-3">
        <CardContent className="space-y-2 p-0">
          <Skeleton className="h-[180px] w-full" />
        </CardContent>
      </Card>
    </div>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/components/loaders/statistics-skeleton.tsx
git commit -m "feat: update statistics skeleton for Strava sections"
```

---

### Task 9: Build Verification

- [ ] **Step 1: Run full build**

Run: `pnpm build`
Expected: Build succeeds with no errors. The Strava sections should render (or gracefully show nothing if env vars are not set in the build environment).

- [ ] **Step 2: Run dev server and verify visually**

Run: `pnpm dev`
Open: `http://localhost:3000/statistics`
Expected:
- GitHub calendar renders as before
- Strava calendar renders below with orange heatmap
- Monthly bar chart renders with orange bars
- Recent activities list shows last 5 activities
- Page looks correct in both light and dark mode

- [ ] **Step 3: Final commit (if any fixes needed)**

```bash
git add -A
git commit -m "fix: address build/visual issues in Strava integration"
```
