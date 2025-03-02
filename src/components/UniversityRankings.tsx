
import React from "react";
import { Trophy, ArrowUp, ArrowDown } from "lucide-react";

interface University {
  name: string;
  rank: number;
  change: string;
  points: number;
}

interface UniversityRankingsProps {
  universities: University[];
}

const UniversityRankings = ({ universities }: UniversityRankingsProps) => {
  return (
    <div className="max-w-7xl mx-auto grid gap-8 mb-16 animate-fade-up" style={{ animationDelay: "0.4s" }}>
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center mb-6">
          <Trophy className="w-6 h-6 text-accent mr-3" />
          <h2 className="text-2xl font-bold text-white">University Rankings</h2>
        </div>
        <div className="grid gap-4">
          {universities.map((uni, index) => (
            <div 
              key={uni.name} 
              className="flex items-center justify-between p-4 hover-scale bg-black/40 rounded-lg animate-fade-in" 
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <div className="flex items-center">
                <span className="text-lg font-semibold mr-4 text-white">#{uni.rank}</span>
                <span className="text-lg text-white">{uni.name}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-4 text-white">{uni.points} pts</span>
                {uni.change === "up" && <ArrowUp className="w-5 h-5 text-green-500" />}
                {uni.change === "down" && <ArrowDown className="w-5 h-5 text-red-500" />}
                {uni.change === "same" && <span className="w-5 h-5 text-gray-500">-</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniversityRankings;
