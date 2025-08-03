import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", earnings: 2400 },
  { month: "Feb", earnings: 1398 },
  { month: "Mar", earnings: 2800 },
  { month: "Apr", earnings: 3908 },
  { month: "May", earnings: 4800 },
  { month: "Jun", earnings: 3800 },
  { month: "Jul", earnings: 4300 },
  { month: "Aug", earnings: 3750 },
];

export function EarningsChart() {
  return (
    <Card className="col-span-2 border-0" style={{ boxShadow: "var(--shadow-card)" }}>
      <CardHeader>
        <CardTitle className="text-foreground">Monthly Earnings Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "var(--shadow-card)",
                }}
                formatter={(value: number) => [`$${value}`, "Earnings"]}
              />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}