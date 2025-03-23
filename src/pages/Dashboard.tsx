
import React from "react";
import { useNavigate } from "react-router-dom";
import { useReading } from "@/context/ReadingContext";
import Header from "@/components/Header";
import PerformanceChart from "@/components/PerformanceChart";
import AccuracyChart from "@/components/AccuracyChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, BookOpen, ArrowLeft, Zap, BarChart2 } from "lucide-react";

const Dashboard = () => {
  const { sessionHistory } = useReading();
  const navigate = useNavigate();

  // Calculate overall stats
  const totalSessions = sessionHistory.length;
  const totalCorrectWords = sessionHistory.reduce((sum, session) => sum + session.correctWords, 0);
  const totalIncorrectWords = sessionHistory.reduce((sum, session) => sum + session.incorrectWords, 0);
  const totalAttemptedWords = totalCorrectWords + totalIncorrectWords;
  const overallAccuracy = totalAttemptedWords > 0 
    ? Math.round((totalCorrectWords / totalAttemptedWords) * 100) 
    : 0;

  const practiceCount = sessionHistory.filter(session => session.mode === 'practice').length;
  const testCount = sessionHistory.filter(session => session.mode === 'test').length;

  // Find best points scored
  const bestPoints = sessionHistory.length 
    ? Math.max(...sessionHistory.map(session => session.points))
    : 0;

  return (
    <div className="min-h-screen flex flex-col pb-10">
      <Header title="Learning Dashboard" showBack={true} />
      
      <div className="flex-1 container px-4 md:px-6 py-6 gap-6 flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-app-blue-dark">Your Reading Progress</h1>
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-app-blue hover:text-app-blue-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </button>
        </div>

        {sessionHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-12">
            <BookOpen className="w-16 h-16 text-app-blue opacity-60" />
            <h2 className="text-xl font-medium text-app-blue-dark">No sessions completed yet</h2>
            <p className="text-muted-foreground text-center max-w-md">
              Complete practice or test sessions to see your progress statistics and improvement over time.
            </p>
            <button 
              onClick={() => navigate("/")}
              className="button-primary mt-4"
            >
              Start Learning
              <Zap className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalSessions}</div>
                  <p className="text-xs text-muted-foreground">
                    {practiceCount} practice, {testCount} test
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Overall Accuracy</CardTitle>
                  <BarChart2 className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overallAccuracy}%</div>
                  <Progress value={overallAccuracy} className="h-2" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Words Attempted</CardTitle>
                  <Zap className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalAttemptedWords}</div>
                  <p className="text-xs text-muted-foreground">
                    {totalCorrectWords} correct, {totalIncorrectWords} incorrect
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Best Score</CardTitle>
                  <Award className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{bestPoints}</div>
                  <p className="text-xs text-muted-foreground">
                    points
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <AccuracyChart sessionHistory={sessionHistory} />
              <PerformanceChart 
                sessionHistory={sessionHistory}
                title="Points Progress"
                dataKey="points"
                color="#3b82f6"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <PerformanceChart 
                sessionHistory={sessionHistory}
                title="Correct Words Progress"
                dataKey="correctWords"
                color="#22c55e"
              />
              <PerformanceChart 
                sessionHistory={sessionHistory}
                title="Incorrect Words Progress"
                dataKey="incorrectWords"
                color="#ef4444"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
