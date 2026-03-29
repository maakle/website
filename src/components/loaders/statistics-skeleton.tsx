import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function StatisticSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Card className="w-full p-3">
        <CardContent className="space-y-2 p-0">
          <Skeleton className="h-[150px] w-full" />
        </CardContent>
      </Card>
      <Card className="w-full p-3">
        <CardContent className="space-y-2 p-0">
          <Skeleton className="h-[150px] w-full" />
        </CardContent>
      </Card>
      <Card className="w-full p-3">
        <CardContent className="space-y-2 p-0">
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
      </Card>
      <Card className="w-full p-3">
        <CardContent className="space-y-2 p-0">
          <Skeleton className="h-[180px] w-full" />
        </CardContent>
      </Card>
    </div>
  )
}
