
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
