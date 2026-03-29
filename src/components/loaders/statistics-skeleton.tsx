import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function StatisticSkeleton() {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* Github Statistics */}
      <section className="space-y-3">
        <Skeleton className="h-4 w-36" />
        <Card className="w-full p-3">
          <div className="space-y-2">
            {/* Month labels */}
            <div className="flex gap-8">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} className="h-3 w-6" />
              ))}
            </div>
            {/* Calendar grid */}
            <div className="flex flex-col gap-[3px]">
              {Array.from({ length: 7 }).map((_, row) => (
                <div key={row} className="flex gap-[3px]">
                  {Array.from({ length: 52 }).map((_, col) => (
                    <Skeleton
                      key={col}
                      className="h-[10px] w-[10px] rounded-sm"
                    />
                  ))}
                </div>
              ))}
            </div>
            {/* Footer */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-48" />
              <div className="flex items-center gap-1">
                <Skeleton className="h-3 w-8" />
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-[10px] w-[10px] rounded-sm" />
                ))}
                <Skeleton className="h-3 w-8" />
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Strava Statistics */}
      <section className="space-y-3">
        <Skeleton className="h-4 w-36" />
        <Card className="w-full p-3">
          <div className="space-y-2">
            <div className="flex gap-8">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} className="h-3 w-6" />
              ))}
            </div>
            <div className="flex flex-col gap-[3px]">
              {Array.from({ length: 7 }).map((_, row) => (
                <div key={row} className="flex gap-[3px]">
                  {Array.from({ length: 52 }).map((_, col) => (
                    <Skeleton
                      key={col}
                      className="h-[10px] w-[10px] rounded-sm"
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-40" />
              <div className="flex items-center gap-1">
                <Skeleton className="h-3 w-8" />
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-[10px] w-[10px] rounded-sm" />
                ))}
                <Skeleton className="h-3 w-8" />
              </div>
            </div>
          </div>
        </Card>

        {/* Bar chart */}
        <Card className="w-full p-3">
          <Skeleton className="mb-3 h-4 w-52" />
          <div className="flex items-end gap-2 px-5">
            {[40, 25, 65, 50, 30, 80, 45, 55, 35, 70, 60, 48].map(
              (h, i) => (
                <Skeleton
                  key={i}
                  className="flex-1 rounded-t-sm"
                  style={{ height: `${h * 2}px` }}
                />
              )
            )}
          </div>
        </Card>

        {/* Recent activities */}
        <Card className="w-full p-3">
          <Skeleton className="mb-3 h-4 w-32" />
          <div className="flex flex-col gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="h-6 w-6 rounded" />
                  <div className="space-y-1">
                    <Skeleton className="h-3.5 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <div className="space-y-1 text-right">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-3 w-10" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  )
}
