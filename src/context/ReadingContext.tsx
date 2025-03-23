
import React, { createContext, useContext, useState, ReactNode } from "react";

type Mode = "practice" | "test";

interface ReadingContextType {
  points: number;
  setPoints: (points: number) => void;
  addPoints: (amount: number) => void;
  reducePoints: (amount: number) => void;
  progress: number;
  setProgress: (progress: number) => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
  correctWords: number;
  setCorrectWords: (count: number) => void;
  incorrectWords: number;
  setIncorrectWords: (count: number) => void;
  resetStats: () => void;
}

const ReadingContext = createContext<ReadingContextType | undefined>(undefined);

export const ReadingProvider = ({ children }: { children: ReactNode }) => {
  const [points, setPoints] = useState(100);
  const [progress, setProgress] = useState(0);
  const [mode, setMode] = useState<Mode>("practice");
  const [correctWords, setCorrectWords] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState(0);

  const addPoints = (amount: number) => {
    setPoints((prev) => prev + amount);
  };

  const reducePoints = (amount: number) => {
    setPoints((prev) => Math.max(0, prev - amount));
  };

  const resetStats = () => {
    setPoints(100);
    setProgress(0);
    setCorrectWords(0);
    setIncorrectWords(0);
  };

  return (
    <ReadingContext.Provider
      value={{
        points,
        setPoints,
        addPoints,
        reducePoints,
        progress,
        setProgress,
        mode,
        setMode,
        correctWords,
        setCorrectWords,
        incorrectWords,
        setIncorrectWords,
        resetStats,
      }}
    >
      {children}
    </ReadingContext.Provider>
  );
};

export const useReading = () => {
  const context = useContext(ReadingContext);
  if (context === undefined) {
    throw new Error("useReading must be used within a ReadingProvider");
  }
  return context;
};
