import { Repo } from "@/types"

import { siteConfig } from "@/config/site"
import { getRepo } from "@/lib/api/github"

interface RepoData {
  error?: string
  data?: Repo[]
}

export async function Projects() {
  let data: RepoData | Repo[] = []

  try {
    data = (await getRepo()) as Repo[] | RepoData
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error)
    data = { error: "Failed to fetch projects" }
  }

  const hasError = !data || "error" in data
  const hasValidProjects = !hasError && Array.isArray(data) && data.length > 0

  if (hasError) {
    return (
      <section className="py-4">
        <div className="px-4">
          <p className="text-sm text-muted-foreground">
            {(data as RepoData).error ||
              "Unable to load projects at this time."}
          </p>
        </div>
      </section>
    )
  }

  if (!hasValidProjects) {
    return (
      <section className="py-4">
        <div className="px-4">
          <p className="text-sm text-muted-foreground">
            No projects available at this time.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-4">
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
    </section>
  )
}
