"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { cn } from "@/lib/utils";

export const description = "A simple area chart";

const chartData = [
  { month: "Jan", client: 15 },
  { month: "Feb", client: 20 },
  { month: "Mar", client: 30 },
  { month: "Apr", client: 55 },
  { month: "May", client: 70 },
  { month: "Jun", client: 85 },
];

const chartConfig = {
  client: {
    label: "Client",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function AreaChartSection({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full flex-col overflow-hidden p-2",
        className
      )}
    >
      <Card className="h-full border-none bg-transparent">
        <CardContent className="p-0">
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{ left: 0, right: 0 }}
            >
              <CartesianGrid vertical={true} />

              <XAxis
                dataKey="month"
                hide
                padding={{ left: 0, right: 0 }}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />

              <Area
                dataKey="client"
                type="linear"
                fill="var(--color-client)"
                fillOpacity={0.4}
                stroke="var(--color-client)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

