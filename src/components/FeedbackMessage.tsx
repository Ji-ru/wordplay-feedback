
import React from "react";
import { Check, X } from "lucide-react";

interface FeedbackMessageProps {
  type: "correct" | "incorrect";
  message: string;
}

const FeedbackMessage = ({ type, message }: FeedbackMessageProps) => {
  return (
    <div 
      className={`flex items-center gap-2 p-4 rounded-lg animate-fade-in 
        ${type === "correct" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
    >
      {type === "correct" ? (
        <Check className="w-6 h-6" />
      ) : (
        <X className="w-6 h-6" />
      )}
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default FeedbackMessage;
