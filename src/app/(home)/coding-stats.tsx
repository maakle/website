import { Languages as LanguagesType } from "@/types"

import { getCodingStats } from "@/lib/api/wakatime"

interface ResponseData {
  data?: {
    human_readable_range?: string
    human_readable_total_including_other_language?: string
    languages?: LanguagesType[]
  }
  error?: string
}

export async function CodingStats() {
  let codingData: ResponseData | null = null

  try {
    codingData = (await getCodingStats()) as ResponseData
  } catch (error) {
    console.error("Failed to fetch coding stats:", error)
    codingData = { error: "Failed to fetch coding stats" }
  }

  const hasCodingError = !codingData || codingData.error || !codingData.data
  const missingRequiredData =
    !hasCodingError &&
    (!codingData.data?.human_readable_range ||
      !codingData.data?.human_readable_total_including_other_language ||
      !Array.isArray(codingData.data?.languages) ||
      codingData.data.languages.length === 0)

  if (hasCodingError || missingRequiredData) {
    return (
      <section className="py-4">
        <div className="px-4">
          <p className="text-sm text-muted-foreground">
            {codingData?.error || "Unable to load coding stats at this time."}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-4">
      <div className="space-y-4 px-4">
        <div className="text-base text-muted-foreground">
          Coding statistics:
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-base font-medium">
                {codingData?.data
                  ?.human_readable_total_including_other_language || "Unknown"}
              </div>
              <div className="text-sm text-muted-foreground">
                Total coding time
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {codingData?.data?.human_readable_range || "Unknown time range"}
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-base font-medium">
                {codingData?.data?.languages?.[0]?.name || "Unknown"}
              </div>
              <div className="text-sm text-muted-foreground">
                Favorite language
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {codingData?.data?.languages?.[0]?.text || "Unknown language"}
            </div>
          </div>
        </div>

        {codingData?.data?.languages &&
          codingData.data?.languages.length > 0 && (
            <div className="text-sm">
              <span className="text-muted-foreground">Top Languages: </span>
              <span className="font-medium">
                {codingData?.data?.languages
                  .slice(0, 10)
                  .map((lang, index) => (
                    <span key={index}>
                      {lang.name}{" "}
                      <span className="text-muted-foreground">
                        ({lang.text})
                      </span>
                      {index <
                      Math.min(codingData?.data?.languages?.length || 0, 10) - 1
                        ? ", "
                        : ""}
                    </span>
                  ))}
              </span>
            </div>
          )}
      </div>
    </section>
  )
}
