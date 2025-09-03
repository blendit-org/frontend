"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", render: 222 },
  { date: "2024-04-02", render: 97},
  { date: "2024-04-03", render: 167 },
  { date: "2024-04-04", render: 242 },
  { date: "2024-04-05", render: 373 },
  { date: "2024-04-06", render: 301 },
  { date: "2024-04-07", render: 245 },
  { date: "2024-04-08", render: 409 },
  { date: "2024-04-09", render: 59 },
  { date: "2024-04-10", render: 261 },
  { date: "2024-04-11", render: 327 },
  { date: "2024-04-12", render: 292 },
  { date: "2024-04-13", render: 342 },
  { date: "2024-04-14", render: 137 },
  { date: "2024-04-15", render: 120 },
  { date: "2024-04-16", render: 138 },
  { date: "2024-04-17", render: 446 },
  { date: "2024-04-18", render: 364 },
  { date: "2024-04-19", render: 243 },
  { date: "2024-04-20", render: 89 },
  { date: "2024-04-21", render: 137 },
  { date: "2024-04-22", render: 224 },
  { date: "2024-04-23", render: 138 },
  { date: "2024-04-24", render: 387 },
  { date: "2024-04-25", render: 215 },
  { date: "2024-04-26", render: 75 },
  { date: "2024-04-27", render: 383 },
  { date: "2024-04-28", render: 122 },
  { date: "2024-04-29", render: 315 },
  { date: "2024-04-30", render: 454 },
  { date: "2024-05-01", render: 165 },
  { date: "2024-05-02", render: 293 },
  { date: "2024-05-03", render: 247 },
  { date: "2024-05-04", render: 385 },
  { date: "2024-05-05", render: 481 },
  { date: "2024-05-06", render: 498 },
  { date: "2024-05-07", render: 388 },
  { date: "2024-05-08", render: 149 },
  { date: "2024-05-09", render: 227 },
  { date: "2024-05-10", render: 293 },
  { date: "2024-05-11", render: 335 },
  { date: "2024-05-12", render: 197 },
  { date: "2024-05-13", render: 197 },
  { date: "2024-05-14", render: 448 },
  { date: "2024-05-15", render: 473 },
  { date: "2024-05-16", render: 338 },
  { date: "2024-05-17", render: 499 },
  { date: "2024-05-18", render: 315 },
  { date: "2024-05-19", render: 235 },
  { date: "2024-05-20", render: 177 },
  { date: "2024-05-21", render: 82 },
  { date: "2024-05-22", render: 81 },
  { date: "2024-05-23", render: 252 },
  { date: "2024-05-24", render: 294 },
  { date: "2024-05-25", render: 201 },
  { date: "2024-05-26", render: 213 },
  { date: "2024-05-27", render: 420 },
  { date: "2024-05-28", render: 233 },
  { date: "2024-05-29", render: 78 },
  { date: "2024-05-30", render: 340 },
  { date: "2024-05-31", render: 178 },
  { date: "2024-06-01", render: 178 },
  { date: "2024-06-02", render: 470 },
  { date: "2024-06-03", render: 103 },
  { date: "2024-06-04", render: 439 },
  { date: "2024-06-05", render: 88 },
  { date: "2024-06-06", render: 294 },
  { date: "2024-06-07", render: 323 },
  { date: "2024-06-08", render: 385 },
  { date: "2024-06-09", render: 438 },
  { date: "2024-06-10", render: 155 },
  { date: "2024-06-11", render: 92 },
  { date: "2024-06-12", render: 492 },
  { date: "2024-06-13", render: 81 },
  { date: "2024-06-14", render: 426 },
  { date: "2024-06-15", render: 307 },
  { date: "2024-06-16", render: 371 },
  { date: "2024-06-17", render: 475 },
  { date: "2024-06-18", render: 107 },
  { date: "2024-06-19", render: 341 },
  { date: "2024-06-20", render: 408 },
  { date: "2024-06-21", render: 169 },
  { date: "2024-06-22", render: 317 },
  { date: "2024-06-23", render: 480 },
  { date: "2024-06-24", render: 132 },
  { date: "2024-06-25", render: 141 },
  { date: "2024-06-26", render: 434 },
  { date: "2024-06-27", render: 448 },
  { date: "2024-06-28", render: 149 },
  { date: "2024-06-29", render: 103 },
  { date: "2024-06-30", render: 446 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  render: {
    label: "render",
    color: "var(--primary)",
  }
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Rendered</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillrender" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-render)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-render)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
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
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="render"
              type="natural"
              fill="url(#fillrender)"
              stroke="var(--color-render)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
