
import React, { useState, useEffect } from "react";
import { useReading } from "@/context/ReadingContext";
import { Check, X, Volume2, Play } from "lucide-react";
import FeedbackMessage from "./FeedbackMessage";
import { Button } from "@/components/ui/button";

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
  const [showTutorial, setShowTutorial] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakWord = () => {
    // In a real app, this would use the Web Speech API
    // For now, we'll simulate it
    console.log(`Speaking word: ${word}`);
    setTimeout(() => {
      setHasSpoken(true);
    }, 1000);
  };

  const playTutorial = () => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      
      // Create an utterance object
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8; // Slightly slower for learning
      
      // Add an event listener for when speech ends
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      // Speak the word
      speechSynthesis.speak(utterance);
      
      console.log(`Tutorial playing for word: ${word}`);
    } else {
      console.log("Speech synthesis not supported in this browser");
    }
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

  // Stop any ongoing speech when component unmounts
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md animate-scale-in flex flex-col items-center">
      <div className="mb-8 text-5xl font-bold text-app-blue-dark">{word}</div>
      
      <div className="w-full space-y-4">
        {/* Voice Tutorial Button */}
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2"
          onClick={playTutorial}
          disabled={isSpeaking}
        >
          <Play className="w-5 h-5" />
          {isSpeaking ? "Playing..." : "Hear Pronunciation"}
        </Button>

        {!hasSpoken ? (
          <Button 
            onClick={speakWord}
            className="w-full flex items-center justify-center gap-2"
          >
            <Volume2 className="w-5 h-5" />
            Listen
          </Button>
        ) : (
          <Button 
            onClick={checkPronunciation}
            variant="secondary"
            className="w-full"
            disabled={showFeedback}
          >
            I've said it
          </Button>
        )}
      </div>
      
      {showFeedback && (
        <div className="mt-4 w-full">
          <FeedbackMessage 
            type={feedback!} 
            message={feedback === "correct" ? "Great job!" : "Try again!"} 
          />
        </div>
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
