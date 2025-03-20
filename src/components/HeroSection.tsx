
import React, { useState } from "react";
import { Search, Gamepad, Trophy, Cpu, Joystick } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const HeroSection = ({ searchQuery, setSearchQuery }: HeroSectionProps) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Here you would typically trigger the actual search functionality
  };

  return (
    <div className="max-w-7xl mx-auto mb-16 animate-fade-up">
      <div className="text-center text-white mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 animate-scale-in animate-text-color">
          Kenyan University Esports Rankings
        </h1>
        <p className="text-xl text-gray-200 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Tracking competitive gaming excellence across Kenyan universities
        </p>
      </div>

      {/* Gaming Themed Animated Elements */}
      <div className="relative">
        <div className="absolute -top-10 -left-10 w-20 h-20 flex items-center justify-center animate-pulse">
          <Gamepad className="w-12 h-12 text-[#8B5CF6] opacity-60" />
        </div>
        <div className="absolute top-0 -right-4 w-16 h-16 flex items-center justify-center animate-bounce" style={{ animationDuration: "3s" }}>
          <Trophy className="w-10 h-10 text-[#F97316] opacity-60" />
        </div>
        <div className="absolute -bottom-8 left-20 w-24 h-24 flex items-center justify-center animate-spin" style={{ animationDuration: "8s" }}>
          <Cpu className="w-14 h-14 text-[#0EA5E9] opacity-60" />
        </div>
        <div className="absolute bottom-4 right-10 w-16 h-16 flex items-center justify-center animate-pulse" style={{ animationDuration: "4s" }}>
          <Joystick className="w-10 h-10 text-[#D946EF] opacity-60" />
        </div>
      </div>

      {/* Enhanced Search Bar */}
      <div className="max-w-xl mx-auto mb-12">
        <form onSubmit={handleSearch}>
          <div className={`glass-card flex items-center p-2 rounded-lg animate-fade-in ${isSearchFocused ? 'ring-2 ring-[#8B5CF6]' : ''}`} style={{ animationDelay: "0.3s" }}>
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search universities, players, or tournaments..."
              className="w-full bg-transparent border-none focus:outline-none text-white placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              aria-label="Search"
            />
            <Button 
              type="submit" 
              size="sm" 
              className="bg-[#ea384c] hover:bg-[#d32e3f] text-white ml-2"
              aria-label="Submit search"
            >
              Search
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HeroSection;
