
import React, { useState } from "react";
import { useReading } from "@/context/ReadingContext";
import { Check, X, Volume2 } from "lucide-react";
import FeedbackMessage from "./FeedbackMessage";

interface WordCardProps {
  word: string;
  correctPronunciation: string;
  onComplete: () => void;
}

const WordCard = ({ word, correctPronunciation, onComplete }: WordCardProps) => {
  const { 
    mode, 
    addPoints, 
    reducePoints, 
    correctWords,
    incorrectWords,
    setCorrectWords, 
    setIncorrectWords 
  } = useReading();
  const [hasSpoken, setHasSpoken] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const speakWord = () => {
    // In a real app, this would use the Web Speech API
    // For now, we'll simulate it
    console.log(`Speaking word: ${word}`);
    setTimeout(() => {
      setHasSpoken(true);
    }, 1000);
  };

  const checkPronunciation = () => {
    // This is where we would check the actual pronunciation
    // For this prototype, we'll randomly determine if it's correct
    const isCorrect = Math.random() > 0.3; // 70% chance of being correct
    
    if (isCorrect) {
      addPoints(10);
      setCorrectWords(correctWords + 1); // Fixed: directly use the new value
      setFeedback("correct");
    } else {
      reducePoints(5);
      setIncorrectWords(incorrectWords + 1); // Fixed: directly use the new value
      setFeedback("incorrect");
    }
    
    setShowFeedback(true);
    
    // After showing feedback, move to next word
    setTimeout(() => {
      setShowFeedback(false);
      onComplete();
    }, 2000);
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md animate-scale-in flex flex-col items-center">
      <div className="mb-8 text-5xl font-bold text-app-blue-dark">{word}</div>
      
      {!hasSpoken ? (
        <button 
          onClick={speakWord}
          className="button-primary w-full mb-4"
        >
          <Volume2 className="w-5 h-5" />
          Listen
        </button>
      ) : (
        <button 
          onClick={checkPronunciation}
          className="button-secondary w-full mb-4"
          disabled={showFeedback}
        >
          I've said it
        </button>
      )}
      
      {showFeedback && (
        <FeedbackMessage 
          type={feedback!} 
          message={feedback === "correct" ? "Great job!" : "Try again!"} 
        />
      )}
      
      {mode === "practice" && (
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>Correct pronunciation: <strong>{correctPronunciation}</strong></p>
        </div>
      )}
    </div>
  );
};

export default WordCard;
