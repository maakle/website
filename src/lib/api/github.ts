import wretch from "wretch"

import { env } from "@/env.mjs"

const apiUrl = env.GH_API_URL

const api = wretch(apiUrl, {
  next: { revalidate: 3600 },
  mode: "cors",
} as RequestInit)
  .errorType("json")
  .resolve((r) => r.json())

export const getRepo = async () => {
  try {
    const response = await api.get("/?username=redpangilinan")

    if (!response || !Array.isArray(response) || response.length === 0) {
      console.error("Invalid response format:", response)
      return { error: "Invalid response from GitHub API" }
    }

    return response
  } catch (error) {
    console.error("Error fetching GitHub data:", error)
    return { error: "Failed to fetch repository data" }
  }
}
