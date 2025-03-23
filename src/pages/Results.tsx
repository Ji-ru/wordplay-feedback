
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useReading } from "@/context/ReadingContext";
import Header from "@/components/Header";
import { Award, BarChart2, ArrowRight, LineChart } from "lucide-react";

const Results = () => {
  const { points, mode, correctWords, incorrectWords, addSessionToHistory } = useReading();
  const navigate = useNavigate();
  
  const totalWords = correctWords + incorrectWords;
  const accuracy = totalWords > 0 ? Math.round((correctWords / totalWords) * 100) : 0;
  
  // Add current session to history when results page is viewed
  useEffect(() => {
    addSessionToHistory();
  }, [addSessionToHistory]);
  
  // Determine performance level based on points and accuracy
  const getPerformanceLevel = () => {
    if (accuracy >= 90) return "Excellent!";
    if (accuracy >= 75) return "Great!";
    if (accuracy >= 60) return "Good";
    return "Keep practicing";
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Your Results" showBack={false} />
      
      <div className="flex-1 flex flex-col items-center p-6">
        <div className="w-full max-w-md animate-scale-in">
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Award className="w-24 h-24 text-app-accent animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">{points}</span>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-center text-app-blue-dark mb-1">
              {getPerformanceLevel()}
            </h2>
            <p className="text-center text-muted-foreground mb-6">
              {mode === "practice" ? "Practice" : "Test"} complete
            </p>
            
            <div className="bg-app-neutral rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-app-blue-dark">Accuracy</span>
                <span className="text-lg font-bold text-app-blue-dark">{accuracy}%</span>
              </div>
              <div className="w-full bg-app-neutral-dark rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-app-blue transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${accuracy}%` }}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-100 rounded-xl p-4 text-center">
                <p className="text-green-800 text-sm font-medium">Correct</p>
                <p className="text-2xl font-bold text-green-800">{correctWords}</p>
              </div>
              <div className="bg-red-100 rounded-xl p-4 text-center">
                <p className="text-red-800 text-sm font-medium">Incorrect</p>
                <p className="text-2xl font-bold text-red-800">{incorrectWords}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <button 
              onClick={() => navigate("/")}
              className="button-primary w-full"
            >
              Go Home
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => navigate("/dashboard")}
              className="button-secondary w-full"
            >
              View Progress Dashboard
              <LineChart className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => navigate(mode === "practice" ? "/practice" : "/test")}
              className="button-secondary w-full"
            >
              Try Again
              <BarChart2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
