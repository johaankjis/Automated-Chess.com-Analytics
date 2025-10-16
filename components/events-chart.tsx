"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartConfig = {
  games: {
    label: "Games",
    color: "hsl(var(--chart-1))",
  },
  puzzles: {
    label: "Puzzles",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

interface EventsChartProps {
  data: Array<{
    date: string
    games: number
    puzzles: number
  }>
}

export function EventsChart({ data }: EventsChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart data={data}>
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
        <Bar dataKey="games" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
        <Bar dataKey="puzzles" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}
