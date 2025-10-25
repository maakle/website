import { Languages as LanguagesType, Repo } from "@/types"

import { siteConfig } from "@/config/site"
import { getRepo } from "@/lib/api/github"
import { getCodingStats } from "@/lib/api/wakatime"
import { SocialMediaIcons } from "@/components/common/social-media-icons"
import { Introduction } from "@/components/introduction"

interface RepoData {
  error?: string
  data?: Repo[]
}

interface ResponseData {
  data?: {
    human_readable_range?: string
    human_readable_total_including_other_language?: string
    languages?: LanguagesType[]
  }
  error?: string
}

export default async function Home() {
  let data: RepoData | Repo[] = []
  let codingData: ResponseData | null = null

  try {
    data = (await getRepo()) as Repo[] | RepoData
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error)
    data = { error: "Failed to fetch projects" }
  }

  try {
    codingData = (await getCodingStats()) as ResponseData
  } catch (error) {
    console.error("Failed to fetch coding stats:", error)
    codingData = { error: "Failed to fetch coding stats" }
  }

  const hasError = !data || "error" in data
  const hasValidProjects = !hasError && Array.isArray(data) && data.length > 0

  const hasCodingError = !codingData || codingData.error || !codingData.data
  const missingRequiredData =
    !hasCodingError &&
    (!codingData.data?.human_readable_range ||
      !codingData.data?.human_readable_total_including_other_language ||
      !Array.isArray(codingData.data?.languages) ||
      codingData.data.languages.length === 0)

  const introSection = (
    <section className="py-4">
      <Introduction />
      <SocialMediaIcons />
    </section>
  )

  const dashboardSection = (
    <section className="py-4">
      {hasCodingError || missingRequiredData ? (
        <div className="px-4">
          <p className="text-sm text-muted-foreground">
            {codingData?.error || "Unable to load coding stats at this time."}
          </p>
        </div>
      ) : (
        <div className="space-y-4 px-4">
          <div className="text-base text-muted-foreground">
            Coding statistics:
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-base font-medium">
                  {codingData?.data
                    ?.human_readable_total_including_other_language ||
                    "Unknown"}
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
                        Math.min(codingData?.data?.languages?.length || 0, 10) -
                          1
                          ? ", "
                          : ""}
                      </span>
                    ))}
                </span>
              </div>
            )}
        </div>
      )}
    </section>
  )

  const projectsSection = (
    <section className="py-4">
      {hasError ? (
        <div className="px-4">
          <p className="text-sm text-muted-foreground">
            {(data as RepoData).error ||
              "Unable to load projects at this time."}
          </p>
        </div>
      ) : hasValidProjects ? (
        <div className="space-y-4 px-4">
          <div className="text-base text-muted-foreground">Projects:</div>
          <div className="space-y-3">
            {(data as Repo[]).slice(0, 6).map((project, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <a
                    href={project.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-medium hover:underline"
                  >
                    {project.repo || "Unknown Project"}
                  </a>
                  {project.description && (
                    <div className="mt-1 text-sm text-muted-foreground">
                      {project.description}
                    </div>
                  )}
                </div>
                {project.stars && project.stars > 0 && (
                  <div className="ml-4 flex items-center gap-1 text-sm text-muted-foreground">
                    <span>★</span>
                    <span>{project.stars}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="pt-2">
            <a
              target="_blank"
              href={`${siteConfig.links.github}?tab=repositories`}
              className="text-sm text-muted-foreground hover:underline"
            >
              View all projects →
            </a>
          </div>
        </div>
      ) : (
        <div className="px-4">
          <p className="text-sm text-muted-foreground">
            No projects available at this time.
          </p>
        </div>
      )}
    </section>
  )

  return (
    <main className="py-2">
      {introSection}
      {dashboardSection}
      {projectsSection}
    </main>
  )
}
