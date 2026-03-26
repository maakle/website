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
    return await api.get("/?username=maakle")
  } catch (error) {
    console.error("Error fetching data:", error)
    return { error: "Failed fetching data" }
  }
}
