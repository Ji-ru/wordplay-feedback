
import React from "react";
import { useNavigate } from "react-router-dom";
import { useReading } from "@/context/ReadingContext";
import { Book, CheckCircle } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const { setMode, resetStats } = useReading();

  const handlePractice = () => {
    resetStats();
    setMode("practice");
    navigate("/practice");
  };

  const handleTest = () => {
    resetStats();
    setMode("test");
    navigate("/test");
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-12 mt-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-app-blue-dark mb-2">ReadWell</h1>
          <p className="text-app-blue-dark/80">Interactive Reading for Grades 1-3</p>
        </div>

        <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <button
            onClick={handlePractice}
            className="w-full p-6 bg-white rounded-2xl card-shadow flex items-center gap-4 hover:bg-app-blue-light/40 transition-colors"
          >
            <div className="bg-app-blue/20 rounded-full p-3">
              <Book className="w-8 h-8 text-app-blue" />
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold text-app-blue-dark">Practice Mode</h2>
              <p className="text-sm text-muted-foreground">Learn and practice at your own pace</p>
            </div>
          </button>

          <button
            onClick={handleTest}
            className="w-full p-6 bg-white rounded-2xl card-shadow flex items-center gap-4 hover:bg-app-blue-light/40 transition-colors"
          >
            <div className="bg-app-accent/20 rounded-full p-3">
              <CheckCircle className="w-8 h-8 text-app-accent" />
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold text-app-blue-dark">Test Mode</h2>
              <p className="text-sm text-muted-foreground">Challenge yourself with a timed test</p>
            </div>
          </button>
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <p>ReadWell uses the Fuller Approach to improve reading skills</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
