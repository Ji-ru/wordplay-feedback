
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface SessionStats {
  date: Date;
  correctWords: number;
  incorrectWords: number;
}

interface AccuracyChartProps {
  sessionHistory: SessionStats[];
}

const AccuracyChart = ({ sessionHistory }: AccuracyChartProps) => {
  if (!sessionHistory.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Accuracy Rate</CardTitle>
        </CardHeader>
        <CardContent className="h-60 flex items-center justify-center">
          <p className="text-muted-foreground">Complete a session to see your accuracy</p>
        </CardContent>
      </Card>
    );
  }

  // Calculate accuracy for each session
  const chartData = sessionHistory.map((session, index) => {
    const dateObj = new Date(session.date);
    const totalWords = session.correctWords + session.incorrectWords;
    const accuracy = totalWords > 0 ? (session.correctWords / totalWords) * 100 : 0;
    
    return {
      name: formatDistanceToNow(dateObj, { addSuffix: true }),
      accuracy: Math.round(accuracy),
      session: index + 1,
    };
  });

  // Calculate improvement if there are at least 2 sessions
  let improvementText = "First session completed";
  if (sessionHistory.length >= 2) {
    const firstSession = sessionHistory[0];
    const lastSession = sessionHistory[sessionHistory.length - 1];
    
    const firstTotal = firstSession.correctWords + firstSession.incorrectWords;
    const lastTotal = lastSession.correctWords + lastSession.incorrectWords;
    
    const firstAccuracy = firstTotal > 0 ? (firstSession.correctWords / firstTotal) * 100 : 0;
    const lastAccuracy = lastTotal > 0 ? (lastSession.correctWords / lastTotal) * 100 : 0;
    
    const change = lastAccuracy - firstAccuracy;
    
    improvementText = change >= 0 
      ? `Improved by ${Math.abs(change).toFixed(1)}%` 
      : `Decreased by ${Math.abs(change).toFixed(1)}%`;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Accuracy Rate</CardTitle>
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
              <YAxis 
                label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft' }}
                domain={[0, 100]} 
              />
              <Tooltip formatter={(value) => [`${value}%`, 'Accuracy']} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="accuracy" 
                stroke="#22c55e" 
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

export default AccuracyChart;
