
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SessionStats {
  date: Date;
  points: number;
  correctWords: number;
  incorrectWords: number;
  mode: string;
}

interface PerformanceChartProps {
  sessionHistory: SessionStats[];
  title: string;
  dataKey: keyof SessionStats;
  color: string;
}

const PerformanceChart = ({ sessionHistory, title, dataKey, color }: PerformanceChartProps) => {
  if (!sessionHistory.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="h-60 flex items-center justify-center">
          <p className="text-muted-foreground">Complete a session to see your progress</p>
        </CardContent>
      </Card>
    );
  }

  // Prepare data for recharts
  const chartData = sessionHistory.map((session, index) => {
    const dateObj = new Date(session.date);
    return {
      name: formatDistanceToNow(dateObj, { addSuffix: true }),
      [dataKey]: session[dataKey],
      session: index + 1,
    };
  });

  // Calculate improvement percentage if there are at least 2 sessions
  let improvementText = "First session completed";
  if (sessionHistory.length >= 2) {
    const firstValue = sessionHistory[0][dataKey] as number;
    const lastValue = sessionHistory[sessionHistory.length - 1][dataKey] as number;
    
    if (typeof firstValue === 'number' && typeof lastValue === 'number') {
      const change = lastValue - firstValue;
      const percentChange = firstValue !== 0 ? (change / firstValue) * 100 : 0;
      
      improvementText = percentChange >= 0 
        ? `Improved by ${Math.abs(percentChange).toFixed(1)}%` 
        : `Decreased by ${Math.abs(percentChange).toFixed(1)}%`;
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>{title}</CardTitle>
        <div className="text-sm font-medium text-muted-foreground">
          {improvementText}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="session" 
                label={{ value: 'Session', position: 'insideBottom', offset: -5 }} 
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey={dataKey as string} 
                stroke={color} 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
