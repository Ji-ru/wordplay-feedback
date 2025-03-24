
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Mode = "practice" | "test";

interface SessionStats {
  date: Date;
  points: number;
  correctWords: number;
  incorrectWords: number;
  mode: Mode;
}

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
  sessionHistory: SessionStats[];
  addSessionToHistory: () => void;
}

const ReadingContext = createContext<ReadingContextType | undefined>(undefined);

export const ReadingProvider = ({ children }: { children: ReactNode }) => {
  const [points, setPoints] = useState(0); // Changed from 100 to 0
  const [progress, setProgress] = useState(0);
  const [mode, setMode] = useState<Mode>("practice");
  const [correctWords, setCorrectWords] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState(0);
  const [sessionHistory, setSessionHistory] = useState<SessionStats[]>(() => {
    const savedHistory = localStorage.getItem('sessionHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // Save session history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sessionHistory', JSON.stringify(sessionHistory));
  }, [sessionHistory]);

  const addPoints = (amount: number) => {
    setPoints((prev) => prev + amount);
  };

  const reducePoints = (amount: number) => {
    setPoints((prev) => Math.max(0, prev - amount));
  };

  const resetStats = () => {
    setPoints(0); // Changed from 100 to 0
    setProgress(0);
    setCorrectWords(0);
    setIncorrectWords(0);
  };

  const addSessionToHistory = () => {
    const newSession: SessionStats = {
      date: new Date(),
      points,
      correctWords,
      incorrectWords,
      mode
    };
    
    setSessionHistory(prev => [...prev, newSession]);
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
        sessionHistory,
        addSessionToHistory,
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
