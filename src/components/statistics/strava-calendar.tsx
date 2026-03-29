"use client"

import { useState } from "react"

import type { CalendarDay } from "@/lib/strava-utils"

const COLORS = {
  light: ["#ebedf0", "#ffedd5", "#fdba74", "#f97316", "#c2410c"],
  dark: ["#161b22", "#533112", "#874d20", "#b56a2e", "#e8903e"],
}

type Mode = "duration" | "calories"

interface Props {
  data: CalendarDay[]
  totalActivities: number
}

export function StravaCalendar({ data, totalActivities }: Props) {
  const [mode, setMode] = useState<Mode>("duration")

  const blockSize = 10
  const blockMargin = 3
  const step = blockSize + blockMargin
  const fontSize = 12
  const labelHeight = fontSize + 10

  // Group days into weeks (columns). Each week has 7 days (Sun-Sat).
  const weeks: CalendarDay[][] = []
  let currentWeek: CalendarDay[] = []

  const firstDayOfWeek = new Date(data[0]?.date ?? new Date()).getDay()
  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push({ date: "", minutes: 0, calories: 0, level: 0, caloriesLevel: 0 })
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

  // Build month labels, skipping any that are too close together
  const allMonthLabels: { label: string; x: number }[] = []
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
        allMonthLabels.push({ label, x: wi * step })
        break
      }
    }
  }
  // Filter out labels that are too close (less than 3 weeks apart)
  const minLabelGap = step * 3
  const monthLabels = allMonthLabels.filter((label, i) => {
    if (i === 0) {
      const next = allMonthLabels[1]
      return !next || next.x - label.x >= minLabelGap
    }
    return true
  })

  const svgWidth = weeks.length * step - blockMargin
  const svgHeight = labelHeight + 7 * step - blockMargin

  function getLevel(day: CalendarDay): number {
    return mode === "duration" ? day.level : day.caloriesLevel
  }

  function getTooltip(day: CalendarDay): string {
    if (mode === "duration") {
      return `${day.minutes} min on ${day.date}`
    }
    return `${day.calories} kcal on ${day.date}`
  }

  return (
    <div
      style={{
        width: "max-content",
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        fontSize,
      }}
    >
      {/* Tab toggle */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div
          style={{
            display: "inline-flex",
            borderRadius: 6,
            overflow: "hidden",
            border: "1px solid rgba(128, 128, 128, 0.2)",
          }}
        >
          <button
            onClick={() => setMode("duration")}
            style={{
              padding: "3px 10px",
              fontSize: 11,
              fontWeight: 500,
              cursor: "pointer",
              border: "none",
              background: mode === "duration" ? "rgba(128, 128, 128, 0.25)" : "transparent",
              color: "inherit",
              transition: "background 0.15s, color 0.15s",
            }}
          >
            Duration
          </button>
          <button
            onClick={() => setMode("calories")}
            style={{
              padding: "3px 10px",
              fontSize: 11,
              fontWeight: 500,
              cursor: "pointer",
              border: "none",
              borderLeft: "1px solid rgba(128, 128, 128, 0.2)",
              background: mode === "calories" ? "rgba(128, 128, 128, 0.25)" : "transparent",
              color: "inherit",
              transition: "background 0.15s, color 0.15s",
            }}
          >
            Calories
          </button>
        </div>
      </div>

      <div style={{ maxWidth: "100%", overflowX: "auto", overflowY: "hidden", paddingBottom: 2 }}>
        <svg
          width={svgWidth}
          height={svgHeight}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          style={{ display: "block", overflow: "visible" }}
        >
          <style>{`
            .strava-calendar text { fill: currentColor; }
            .strava-calendar rect { stroke: rgba(0,0,0,0.08); stroke-width: 1px; shape-rendering: geometricPrecision; }
            @media (prefers-color-scheme: dark) {
              .strava-calendar rect { stroke: rgba(255,255,255,0.04); }
            }
          `}</style>
          <g className="strava-calendar">
            {/* Month labels */}
            {monthLabels.map(({ label, x }) => (
              <text
                key={`${label}-${x}`}
                x={x}
                y={fontSize}
                fontSize={fontSize}
              >
                {label}
              </text>
            ))}

            {/* Day cells */}
            {weeks.map((week, wi) =>
              week.map((day, di) => (
                <rect
                  key={`${wi}-${di}`}
                  x={wi * step}
                  y={labelHeight + di * step}
                  width={blockSize}
                  height={blockSize}
                  rx={2}
                  ry={2}
                  style={day.date ? {} : { opacity: 0 }}
                  fill={`var(--strava-level-${getLevel(day)})`}
                >
                  {day.date && (
                    <title>{getTooltip(day)}</title>
                  )}
                </rect>
              ))
            )}
          </g>
        </svg>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "4px 16px",
          whiteSpace: "nowrap",
        }}
      >
        <div>
          {totalActivities} {totalActivities === 1 ? "activity" : "activities"}{" "}
          in the last year
        </div>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: blockMargin,
          }}
        >
          <span style={{ marginRight: "0.4em" }}>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <svg key={level} width={blockSize} height={blockSize}>
              <rect
                width={blockSize}
                height={blockSize}
                fill={`var(--strava-level-${level})`}
                rx={2}
                ry={2}
              />
            </svg>
          ))}
          <span style={{ marginLeft: "0.4em" }}>More</span>
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
