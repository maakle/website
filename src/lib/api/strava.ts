import { env } from "@/env.mjs"

interface TokenResponse {
  access_token: string
  refresh_token: string
  expires_at: number
}

export interface StravaActivity {
  id: number
  name: string
  type: string
  sport_type: string
  distance: number
  moving_time: number
  kilojoules: number
  start_date: string
  start_date_local: string
}

interface DetailedActivity {
  calories: number
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

export async function getActivityCalories(
  accessToken: string,
  activityId: number
): Promise<number> {
  try {
    const res = await fetch(
      `https://www.strava.com/api/v3/activities/${activityId}?include_all_efforts=false`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        next: { revalidate: 3600 },
      } as RequestInit
    )
    if (!res.ok) return 0
    const data: DetailedActivity = await res.json()
    return Math.round(data.calories ?? 0)
  } catch {
    return 0
  }
}

export async function getRecentActivityCalories(
  activities: StravaActivity[],
  limit = 5
): Promise<Map<number, number>> {
  if (!env.STRAVA_CLIENT_ID || !env.STRAVA_CLIENT_SECRET || !env.STRAVA_REFRESH_TOKEN) {
    return new Map()
  }

  try {
    const accessToken = await refreshAccessToken()
    const recent = [...activities]
      .sort(
        (a, b) =>
          new Date(b.start_date_local).getTime() -
          new Date(a.start_date_local).getTime()
      )
      .slice(0, limit)

    const entries = await Promise.all(
      recent.map(async (a) => {
        const cal = await getActivityCalories(accessToken, a.id)
        return [a.id, cal] as [number, number]
      })
    )
    return new Map(entries)
  } catch {
    return new Map()
  }
}
