
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useReading } from "@/context/ReadingContext";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import WordCard from "@/components/WordCard";
import PointDisplay from "@/components/PointDisplay";

// Sample words for practice
const practiceWords = [
  { word: "cat", pronunciation: "k-a-t" },
  { word: "dog", pronunciation: "d-o-g" },
  { word: "fish", pronunciation: "f-i-sh" },
  { word: "bird", pronunciation: "b-er-d" },
  { word: "tree", pronunciation: "t-r-ee" },
  { word: "book", pronunciation: "b-oo-k" },
  { word: "sun", pronunciation: "s-u-n" },
  { word: "moon", pronunciation: "m-oo-n" },
  { word: "star", pronunciation: "s-t-ar" },
  { word: "house", pronunciation: "h-ou-s" },
];

const Practice = () => {
  const { setProgress } = useReading();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Update progress based on current word index
    const newProgress = (currentWordIndex / practiceWords.length) * 100;
    setProgress(newProgress);
  }, [currentWordIndex, setProgress]);

  const handleNextWord = () => {
    if (currentWordIndex < practiceWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      // Practice complete, navigate to results
      navigate("/results");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Practice Reading" showBack={true} />
      
      <div className="flex-1 flex flex-col items-center p-6">
        <div className="w-full max-w-md mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-app-blue-dark/80">
              Word {currentWordIndex + 1} of {practiceWords.length}
            </span>
            <PointDisplay />
          </div>
          <ProgressBar />
        </div>
        
        <div className="flex-1 flex items-center justify-center w-full">
          <WordCard 
            word={practiceWords[currentWordIndex].word}
            correctPronunciation={practiceWords[currentWordIndex].pronunciation}
            onComplete={handleNextWord}
          />
        </div>
      </div>
    </div>
  );
};

export default Practice;
