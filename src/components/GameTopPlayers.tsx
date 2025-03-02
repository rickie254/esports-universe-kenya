
import React from "react";
import { Award } from "lucide-react";

interface Player {
  name: string;
  university: string;
  rating: number;
}

interface GameTopPlayersProps {
  gameTopPlayers: Record<string, Player[]>;
}

const GameTopPlayers = ({ gameTopPlayers }: GameTopPlayersProps) => {
  return (
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {Object.entries(gameTopPlayers).map(([game, players], index) => (
        <div 
          key={game} 
          className="glass-card rounded-xl p-6 animate-fade-up"
          style={{ animationDelay: `${0.2 + index * 0.1}s` }}
        >
          <div className="flex items-center mb-6">
            <Award className="w-6 h-6 text-accent mr-3" />
            <h2 className="text-2xl font-bold text-white capitalize">
              {game === "codm" ? "Call of Duty Mobile" : game.toUpperCase()} Top Players
            </h2>
          </div>
          <div className="grid gap-4">
            {players.map((player, playerIndex) => (
              <div 
                key={player.name} 
                className="p-4 hover-scale bg-black/40 rounded-lg animate-fade-in"
                style={{ animationDelay: `${0.1 * (playerIndex + 1)}s` }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-white">#{playerIndex + 1} {player.name}</span>
                  <span className="text-sm text-accent">{player.rating} MMR</span>
                </div>
                <div className="text-sm text-gray-400">
                  {player.university}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameTopPlayers;
