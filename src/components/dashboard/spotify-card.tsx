"use client"

import Link from "next/link"
import { useLanyard } from "@/hooks/use-lanyard"
import { FaSpotify } from "react-icons/fa"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ProgressBar } from "@/components/timer/progress-bar"

export function SpotifyCard() {
  const { data, isLoading } = useLanyard()
  const activity = data?.data?.activities.find(
    (activity: any) => activity.name === "Spotify"
  )
  const trackId = data?.data?.spotify?.track_id

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    )
  }

  if (!activity) {
    return (
      <Alert className="flex items-center justify-start gap-4 border-none">
        <div>
          <FaSpotify className="h-12 w-12 text-[#1ED760]" />
        </div>
        <div>
          <AlertTitle>No activity</AlertTitle>
          <AlertDescription className="text-muted-foreground">
            Not listening to anything currently
          </AlertDescription>
        </div>
      </Alert>
    )
  }

  return (
    <Alert className="flex flex-col items-center gap-3 border-none text-center sm:flex-row sm:p-0 sm:text-left">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <img
              src={data?.data.spotify.album_art_url}
              width={120}
              height={120}
              alt="Activity image"
              className="rounded"
            />
          </TooltipTrigger>
          <TooltipContent>
            {activity.assets
              ? activity.assets.large_text || activity.name
              : activity.name}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="flex w-full flex-col items-center justify-between gap-2 sm:flex-row">
        <div className="flex flex-col">
          <Link
            href={`https://open.spotify.com/track/${trackId}`}
            target="_blank"
          >
            <AlertTitle className="line-clamp-1 hover:underline">
              {activity.details || null}
            </AlertTitle>
          </Link>
          <AlertDescription className="line-clamp-1">
            {activity.state || null}
          </AlertDescription>
          <AlertDescription className="flex justify-center sm:block">
            {activity.timestamps &&
            activity.timestamps.start &&
            activity.timestamps.end ? (
              <ProgressBar
                start={activity.timestamps.start}
                end={activity.timestamps.end}
              />
            ) : null}
          </AlertDescription>
        </div>
        <Link
          href={`spotify:track:${trackId}`}
          target="_blank"
          className={buttonVariants({ size: "sm" })}
        >
          <FaSpotify className="mr-2 h-4 w-4" />
          Play on Spotify
        </Link>
      </div>
    </Alert>
  )
}
