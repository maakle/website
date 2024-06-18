import Link from "next/link"
import { Repo } from "@/types"
import { Star } from "lucide-react"

import { CardDescription, CardTitle } from "@/components/ui/card"

interface ProjectCardProps {
  project: Repo
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      target="_blank"
      href={project.link}
      rel="noopener noreferrer"
      aria-label={project.repo}
      className="flex flex-col justify-between gap-2 rounded-md p-4 hover:bg-muted"
    >
      <div className="flex flex-col gap-1">
        <CardTitle className="text-base">{project.repo}</CardTitle>
        <CardDescription className="line-clamp-2 text-sm font-light">
          {project.description}
        </CardDescription>
      </div>
      <CardDescription className="flex items-center gap-1">
        <Star className="h-4 w-4" />
        {project.stars}
      </CardDescription>
    </Link>
  )
}
