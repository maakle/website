"use client"

import { Languages as LanguagesType } from "@/types"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

import { languageColors } from "@/lib/language-colors"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LanguagesProps {
  languages: LanguagesType[]
}

export function Languages({ languages }: LanguagesProps) {
  const data = languages.slice(0, 10)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Top Languages</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-0">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={100}
              paddingAngle={3}
              strokeWidth={0}
              dataKey="hours"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={languageColors[entry.name] || "#1f9aef"}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(text, name, entry) => [
                `${entry.payload.text} (${entry.payload.percent}%)`,
                entry.payload.name,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center">
          <div className="p-4">
            {data.map((entry, index) => (
              <div key={index} className="mb-2 flex items-center text-sm">
                <span
                  className="mr-2 inline-block h-4 w-4"
                  style={{
                    backgroundColor: languageColors[entry.name] || "#1f9aef",
                  }}
                ></span>
                {entry.name} - {entry.text}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
