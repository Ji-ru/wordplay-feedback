
import React from "react";
import { useReading } from "@/context/ReadingContext";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
  showBack?: boolean;
}

const Header = ({ title, showBack = false }: HeaderProps) => {
  const { mode } = useReading();
  const navigate = useNavigate();

  return (
    <header className="w-full py-4 px-6 glass-effect rounded-b-2xl sticky top-0 z-10 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {showBack && (
            <button 
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-app-blue/10 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-app-blue-dark" />
            </button>
          )}
          <h1 className="text-xl font-bold text-app-blue-dark">{title}</h1>
        </div>
        {mode && (
          <div className="px-3 py-1 rounded-full bg-app-blue text-white text-sm font-medium">
            {mode === "practice" ? "Practice" : "Test"}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
