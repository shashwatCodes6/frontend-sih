import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "Sunday", desktop: 186, mobile: 80 },
  { month: "Monday", desktop: 305, mobile: 200 },
  { month: "Tuesday", desktop: 237, mobile: 120 },
  { month: "Wednesday", desktop: 73, mobile: 190 },
  { month: "Thursday", desktop: 209, mobile: 130 },
  { month: "Friday", desktop: 214, mobile: 140 },
  { month: "Saturday", desktop: 214, mobile: 140 },
];

const chartConfig= {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
};

export function Chart(props) {
    return (
        <ChartContainer config={props.chartConfig||chartConfig} className="h-2/3 w-full md:w-2/3 ">
          <BarChart accessibilityLayer data={props.chartData||chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      )
}
