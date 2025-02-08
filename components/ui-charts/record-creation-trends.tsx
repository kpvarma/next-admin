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

import { TimeSeriesDataResponse } from "@/utils/models/definitions";

const chartConfig = {
  hover_label: { label: "Records" },
  created: { label: "Created", color: "hsl(var(--chart-1))" },
  updated: { label: "Updated", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig

interface RecordCreationTrendsProps {
  timeSeriesDataResponse: TimeSeriesDataResponse;
}

export function RecordCreationTrends({ timeSeriesDataResponse }: RecordCreationTrendsProps) {
  const { 
    data = [], 
    createdThisMonth = 0, updatedThisMonth = 0, 
    createdThisWeek = 0, updatedThisWeek = 0, 
    createdLastMonth = 0, updatedLastMonth = 0, 
    createdLastWeek = 0, updatedLastWeek = 0 
  } = timeSeriesDataResponse;

  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("created");

  const total = React.useMemo(() => ({
    created: data.reduce((acc, curr) => acc + curr.created, 0),
    updated: data.reduce((acc, curr) => acc + curr.updated, 0),
  }), [data]);

  return (
    <div>
      {/* KPI Summary Box */}
      <div className="grid grid-cols-4 gap-4 pb-4">
        {[
          { label: "Created this week", value: createdThisWeek, subLabel: "from last week", subValue: createdLastWeek },
          { label: "Updated this week", value: updatedThisWeek, subLabel: "from last week", subValue: updatedLastWeek },
          { label: "Created this month", value: createdThisMonth, subLabel: "from last month", subValue: createdLastMonth },
          { label: "Updated this month", value: updatedThisMonth, subLabel: "from last month", subValue: updatedLastMonth },
        ].map((item, index) => (
          <div key={index} className="p-4 rounded-xl border bg-card text-card-foreground shadow">
            {/* "rounded-xl border bg-card text-card-foreground shadow" */}
            <span className="tracking-tight text-sm font-normal">{item.label}</span>
            <div className="text-2xl font-bold">{item.value.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">{(((item.value - item.subValue)/item.subValue)*100).toFixed(2)}% {item.subLabel} ({item.subValue.toLocaleString()})</div>
          </div>
        ))}
      </div>

      {/* Chart Card */}
      <Card>
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>Trends - Record Creation</CardTitle>
            <CardDescription>Showing record creation trends for the last 3 months.</CardDescription>
          </div>

          {/* Toggle Between Created & Updated */}
          <div className="flex">
            {["created", "updated"].map((key) => {
              const chart = key as keyof typeof chartConfig;
              return (
                <button
                  key={chart}
                  data-active={activeChart === chart}
                  className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                  onClick={() => setActiveChart(chart)}
                >
                  <span className="text-xs text-muted-foreground">{chartConfig[chart].label}</span>
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    {total[chart as keyof typeof total].toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground">records</span>
                </button>
              );
            })}
          </div>
        </CardHeader>

        <CardContent className="px-2 sm:p-6">
          <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
            <BarChart
              accessibilityLayer
              data={data}
              margin={{ left: 12, right: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="hover_label"
                    labelFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    }
                  />
                }
              />
              <Bar dataKey={activeChart} stackId="a" fill={`var(--color-${activeChart})`} radius={[0, 0, 4, 4]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}