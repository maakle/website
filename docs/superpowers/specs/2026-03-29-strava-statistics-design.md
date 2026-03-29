# Strava Statistics Integration

## Overview

Add Strava activity data to the existing statistics page, displaying an activity heatmap calendar, a monthly activity bar chart, and a list of recent activities. The page layout extends the existing full-width stacked design: GitHub calendar on top, followed by the Strava calendar, a monthly activity bar chart, and a recent activities list — all full-width.

## Architecture

### Authentication & Data Fetching

Strava uses OAuth2 with token refresh. A one-time manual OAuth flow produces a refresh token that is stored as an environment variable. At runtime, the server exchanges the refresh token for a short-lived access token before each API call.

**Environment variables** (added to `env.mjs`):
- `STRAVA_CLIENT_ID` — from Strava API app settings
- `STRAVA_CLIENT_SECRET` — from Strava API app settings
- `STRAVA_REFRESH_TOKEN` — obtained via one-time OAuth flow

**API module** (`src/lib/api/strava.ts`):
- `refreshAccessToken()` — POST to `https://www.strava.com/oauth/token` with client ID, secret, and refresh token. Returns a fresh access token.
- `getActivities()` — fetches all activities from the last 12 months using `GET https://www.strava.com/api/v3/athlete/activities`. Paginates with `per_page=200` and `after` (epoch timestamp). Uses wretch, consistent with the existing GitHub API pattern. Caches with `revalidate: 3600`.

### One-Time OAuth Setup

To obtain the initial refresh token:

1. Create a Strava API application at https://www.strava.com/settings/api (callback domain: `localhost`)
2. Visit: `https://www.strava.com/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=http://localhost&response_type=code&scope=read,activity:read`
3. Authorize the app. Strava redirects to `http://localhost?code=AUTHORIZATION_CODE`
4. Exchange the code for tokens:
   ```bash
   curl -X POST https://www.strava.com/oauth/token \
     -d client_id=YOUR_CLIENT_ID \
     -d client_secret=YOUR_CLIENT_SECRET \
     -d code=AUTHORIZATION_CODE \
     -d grant_type=authorization_code
   ```
5. Save the `refresh_token` from the response as `STRAVA_REFRESH_TOKEN`

### Data Transformation (`src/lib/strava-utils.ts`)

Raw Strava activities are transformed into three shapes:

**Calendar data** — `Map<string, number>` mapping date strings (`YYYY-MM-DD`) to activity count for that day. Used by the heatmap calendar. Intensity levels: 0 (no activity), 1 (1 activity), 2 (2 activities), 3+ (3 or more).

**Monthly chart data** — `{ month: string, count: number }[]` with 12 entries, one per month going back from the current month. Used by the recharts BarChart.

**Recent activities** — The 5 most recent activities, each with:
- `name` — activity title from Strava
- `type` — activity type (Run, Ride, Swim, Hike, etc.)
- `distance` — in kilometers (converted from meters)
- `movingTime` — formatted as `mm:ss` or `h:mm:ss`
- `date` — formatted date string
- `icon` — emoji mapped from activity type (Run -> runner, Ride -> cyclist, Swim -> swimmer, Hike -> boot, default -> person)

## UI Components

### Page Layout (`src/app/statistics/page.tsx`)

Stacked full-width layout:
```
[GitHub Calendar (100%)]          <- full-width, existing
[Strava Calendar (100%)]         <- full-width, matching style
[Monthly Activity Chart (100%)]  <- full-width bar chart
[Recent Activities (100%)]       <- full-width list
```

All sections are full-width cards stacked vertically with consistent spacing. This keeps both calendars fully readable without compression.

### Strava Activity Calendar (`src/components/statistics/strava-calendar.tsx`)

Custom heatmap calendar component matching the visual style of `react-github-calendar`:
- 52 columns (weeks) x 7 rows (days of week)
- Month labels along the top
- Orange color scheme: empty (`#ebedf0`), level 1 (`#ffedd5`), level 2 (`#fdba74`), level 3 (`#f97316`), level 4 (`#c2410c`)
- Dark mode support using CSS variables or Tailwind dark: classes
- Summary text at bottom: "X activities in the last year"
- Tooltip on hover showing date and activity count

### Monthly Activity Chart (`src/components/statistics/activity-chart.tsx`)

Recharts `BarChart` (already installed in the project):
- 12 bars, one per month
- Orange fill color (`#f97316`)
- X-axis: month abbreviations
- Y-axis: activity count
- Responsive container
- Dark mode compatible (axis label colors)

### Recent Activities (`src/components/statistics/recent-activities.tsx`)

List of 5 most recent activities:
- Each row shows: activity type emoji, activity name, date, distance (km), and duration
- Alternating subtle background for readability
- Wrapped in a Card component (consistent with existing UI)

### Loading State

Update `StatisticSkeleton` in `src/components/loaders/statistics-skeleton.tsx` to show skeleton placeholders for the new grid layout.

## Error Handling

- If Strava API fails (token expired, rate limit, network error), the Strava sections show a graceful fallback message ("Strava data unavailable") rather than breaking the page
- GitHub calendar continues to work independently
- Errors are logged server-side via `console.error`, consistent with the existing GitHub API pattern

## Files to Create/Modify

**New files:**
- `src/lib/api/strava.ts` — Strava API client (token refresh + activity fetching)
- `src/lib/strava-utils.ts` — data transformation utilities
- `src/components/statistics/strava-calendar.tsx` — heatmap calendar component
- `src/components/statistics/activity-chart.tsx` — recharts bar chart
- `src/components/statistics/recent-activities.tsx` — recent activities list

**Modified files:**
- `src/env.mjs` — add 3 Strava env vars
- `src/app/statistics/page.tsx` — new grid layout, fetch Strava data, render new components
- `src/components/loaders/statistics-skeleton.tsx` — update skeleton for new layout
- `.env.example` — add Strava env var placeholders
