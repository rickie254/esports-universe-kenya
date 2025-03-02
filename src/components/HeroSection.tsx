
import React from "react";
import { Search } from "lucide-react";

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const HeroSection = ({ searchQuery, setSearchQuery }: HeroSectionProps) => {
  return (
    <div className="max-w-7xl mx-auto mb-16 animate-fade-up">
      <div className="text-center text-white mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 animate-scale-in">
          Kenyan University Esports Rankings
        </h1>
        <p className="text-xl text-gray-200 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Tracking competitive gaming excellence across Kenyan universities
        </p>
      </div>

      {/* Colorful Animated Elements */}
      <div className="relative">
        <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-blue-500/30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-16 h-16 rounded-full bg-purple-500/30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-24 h-24 rounded-full bg-pink-500/30 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-4 right-10 w-16 h-16 rounded-full bg-yellow-500/30 animate-blob animation-delay-6000"></div>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-12">
        <div className="glass-card flex items-center p-2 rounded-lg animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search universities, players, or tournaments..."
            className="w-full bg-transparent border-none focus:outline-none text-white placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
