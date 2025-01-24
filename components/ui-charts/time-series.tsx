"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { date: "2024-04-01", created: 222, updated: 150 },
  { date: "2024-04-02", created: 97, updated: 180 },
  { date: "2024-04-03", created: 167, updated: 120 },
  { date: "2024-04-04", created: 242, updated: 260 },
]

const chartConfig = {
  views: {
    label: "Page Views",
  },
  created: {
    label: "Created",
    color: "hsl(var(--chart-1))",
  },
  updated: {
    label: "Updated",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function RecordCreationTrends() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("created")

  const total = React.useMemo(
    () => ({
      created: chartData.reduce((acc, curr) => acc + curr.created, 0),
      updated: chartData.reduce((acc, curr) => acc + curr.updated, 0),
    }),
    []
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Trends - Record Creation</CardTitle>
          <CardDescription>
            Showing record creation trends for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["created", "updated"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} stackId="a" fill={`var(--color-${activeChart})`} radius={[0, 0, 4, 4]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
