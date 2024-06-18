"use client"

import React, { Suspense } from "react"
import { Application } from "@splinetool/runtime"

const Spline = React.lazy(() => import("@splinetool/react-spline"))

export function Cube() {
  function onLoad(spline: Application) {
    spline.canvas.style.height = "270px"
    spline.canvas.style.width = "270px"
  }

  return (
    <div className="flex h-80 justify-center py-4">
      <Suspense
        fallback={
          <div className="h-60 w-60 animate-pulse rounded-lg bg-muted" />
        }
      >
        <div>
          <Spline
            onLoad={onLoad}
            scene="https://prod.spline.design/y9kG3baUI0jXscIP/scene.splinecode"
          />
        </div>
      </Suspense>
    </div>
  )
}
