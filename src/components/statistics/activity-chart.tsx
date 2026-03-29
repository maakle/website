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
