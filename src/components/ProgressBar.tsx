
import React from "react";
import { useReading } from "@/context/ReadingContext";

interface ProgressBarProps {
  className?: string;
}

const ProgressBar = ({ className }: ProgressBarProps) => {
  const { progress } = useReading();

  return (
    <div className={`w-full bg-app-neutral-dark rounded-full h-3 overflow-hidden ${className}`}>
      <div 
        className="h-full bg-app-blue-dark transition-all duration-500 ease-out rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
