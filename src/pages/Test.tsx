
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useReading } from "@/context/ReadingContext";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import WordCard from "@/components/WordCard";
import PointDisplay from "@/components/PointDisplay";
import { Clock } from "lucide-react";

// Sample words for test
const testWords = [
  { word: "walk", pronunciation: "w-o-k" },
  { word: "jump", pronunciation: "j-u-m-p" },
  { word: "play", pronunciation: "p-l-ay" },
  { word: "smile", pronunciation: "s-m-i-l" },
  { word: "laugh", pronunciation: "l-a-f" },
  { word: "friend", pronunciation: "f-r-e-n-d" },
  { word: "school", pronunciation: "s-k-oo-l" },
  { word: "water", pronunciation: "w-o-t-er" },
  { word: "happy", pronunciation: "h-a-p-ee" },
  { word: "together", pronunciation: "t-u-g-e-th-er" },
];

const Test = () => {
  const { setProgress } = useReading();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const navigate = useNavigate();

  useEffect(() => {
    // Update progress based on current word index
    const newProgress = (currentWordIndex / testWords.length) * 100;
    setProgress(newProgress);
  }, [currentWordIndex, setProgress]);

  useEffect(() => {
    // Timer for test mode
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/results");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleNextWord = () => {
    if (currentWordIndex < testWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      // Test complete, navigate to results
      navigate("/results");
    }
  };

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Reading Test" showBack={true} />
      
      <div className="flex-1 flex flex-col items-center p-6">
        <div className="w-full max-w-md mb-8">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full">
              <Clock className="w-4 h-4 text-app-blue-dark" />
              <span className="text-sm font-medium text-app-blue-dark">
                {formatTime(timeLeft)}
              </span>
            </div>
            <PointDisplay />
          </div>
          <ProgressBar />
        </div>
        
        <div className="flex-1 flex items-center justify-center w-full">
          <WordCard 
            word={testWords[currentWordIndex].word}
            correctPronunciation={testWords[currentWordIndex].pronunciation}
            onComplete={handleNextWord}
          />
        </div>
      </div>
    </div>
  );
};

export default Test;
