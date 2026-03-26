"use client"

import * as React from "react"

import { discordTimestamp } from "@/lib/time"

interface TimestampProps {
  unixTimestamp: number
}

export function ElapsedTime({ unixTimestamp }: TimestampProps) {
  const [timeAgo, setTimeAgo] = React.useState(discordTimestamp(unixTimestamp))

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeAgo(discordTimestamp(unixTimestamp))
    }, 1000)

    return () => clearInterval(intervalId)
  }, [unixTimestamp])

  return <>{timeAgo}</>
}
