
import React, { useEffect, useRef } from "react";
import { useReading } from "@/context/ReadingContext";

const PointDisplay = () => {
  const { points } = useReading();
  const prevPoints = useRef(points);
  const pointsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (points !== prevPoints.current) {
      if (pointsRef.current) {
        pointsRef.current.classList.add("animate-point-change");
        setTimeout(() => {
          if (pointsRef.current) {
            pointsRef.current.classList.remove("animate-point-change");
          }
        }, 300);
      }
      prevPoints.current = points;
    }
  }, [points]);

  return (
    <div className="flex flex-col items-center px-6 py-3 glass-effect rounded-xl shadow-sm">
      <span className="text-sm text-app-blue-dark font-medium">Points</span>
      <div ref={pointsRef} className="text-2xl font-bold text-app-accent">
        {points}
      </div>
    </div>
  );
};

export default PointDisplay;
