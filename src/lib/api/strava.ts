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
    const errorBody = await res.text()
    console.error("Strava token refresh error body:", errorBody)
    throw new Error(`Strava token refresh failed: ${res.status}`)
  }

  const data: TokenResponse = await res.json()
  return data.access_token
}

export async function getActivities(): Promise<StravaActivity[]> {
  if (!env.STRAVA_CLIENT_ID || !env.STRAVA_CLIENT_SECRET || !env.STRAVA_REFRESH_TOKEN) {
    return []
  }

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
