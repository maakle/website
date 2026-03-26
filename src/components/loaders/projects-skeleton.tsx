import { Skeleton } from "@/components/ui/skeleton"

export function ProjectsSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex flex-col justify-between gap-2 p-4">
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-4 w-[10rem]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[15rem]" />
          </div>
          <Skeleton className="h-4 w-[2.5rem]" />
        </div>
      ))}
    </>
  )
}
