import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function StatisticSkeleton() {
  return (
    <>
      <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coding hours</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-8 w-[12.5rem]" />
            <Skeleton className="h-4 w-[8rem]" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Most used language
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-8 w-[12.5rem]" />
            <Skeleton className="h-4 w-[8rem]" />
          </CardContent>
        </Card>
      </div>
      <Card className="w-full pt-6">
        <CardContent className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Top Languages</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4">
          {Array.from({ length: 16 }).map((_, index) => (
            <div className="space-y-2 p-3" key={index}>
              <Skeleton className="h-4 w-[6rem]" />
              <Skeleton className="h-4 w-[5rem]" />
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  )
}
