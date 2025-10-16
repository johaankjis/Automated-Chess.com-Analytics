"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartConfig = {
  dau: {
    label: "Daily Active Users",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

interface OverviewChartProps {
  data: Array<{
    date: string
    dau: number
  }>
}

export function OverviewChart({ data }: OverviewChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="fillDau" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => {
            const date = new Date(value)
            return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
          }}
          stroke="hsl(var(--muted-foreground))"
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
          stroke="hsl(var(--muted-foreground))"
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area type="monotone" dataKey="dau" stroke="hsl(var(--chart-1))" fill="url(#fillDau)" strokeWidth={2} />
      </AreaChart>
    </ChartContainer>
  )
}
