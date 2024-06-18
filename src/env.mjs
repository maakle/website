import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    WAKATIME_API_KEY: z.string().startsWith("waka_"),
    GH_API_URL: z.string().startsWith("https://"),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
  },
  runtimeEnv: {
    WAKATIME_API_KEY: process.env.WAKATIME_API_KEY,
    GH_API_URL: process.env.GH_API_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
})
