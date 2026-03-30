"use client"

import { useTheme } from "next-themes"
import GitHubCalendar from "react-github-calendar"

export function GithubCalendar() {
  const { resolvedTheme } = useTheme()

  return (
    <GitHubCalendar
      username="maakle"
      fontSize={12}
      blockMargin={3}
      blockSize={10}
      colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
      theme={{
        dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
      }}
    />
  )
}
