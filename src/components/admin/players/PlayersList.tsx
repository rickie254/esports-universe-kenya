
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { GameTopPlayers } from "@/types/admin-dashboard";
import { getMetricLabel } from "@/utils/game-metrics";

interface PlayersListProps {
  selectedGame: string;
  gameTopPlayers: GameTopPlayers;
  setGameTopPlayers: React.Dispatch<React.SetStateAction<GameTopPlayers>>;
}

const PlayersList = ({ 
  selectedGame, 
  gameTopPlayers, 
  setGameTopPlayers 
}: PlayersListProps) => {
  // Handle player rating change
  const handlePlayerRatingChange = (index: number, newRating: number) => {
    const updatedGameTopPlayers = { ...gameTopPlayers };
    updatedGameTopPlayers[selectedGame][index].rating = newRating;
    setGameTopPlayers(updatedGameTopPlayers);
  };

  // Remove player
  const handleRemovePlayer = (index: number) => {
    const updatedGameTopPlayers = { ...gameTopPlayers };
    updatedGameTopPlayers[selectedGame] = [...updatedGameTopPlayers[selectedGame]];
    updatedGameTopPlayers[selectedGame].splice(index, 1);
    setGameTopPlayers(updatedGameTopPlayers);
  };

  return (
    <div className="space-y-4">
      {gameTopPlayers[selectedGame]?.map((player, index) => (
        <div key={index} className="flex items-center justify-between p-4 bg-black/40 rounded-lg">
          <div>
            <div className="text-lg text-white mb-1">{player.name}</div>
            <div className="text-sm text-gray-400">{player.university}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Input 
                type="number"
                value={player.rating}
                onChange={(e) => handlePlayerRatingChange(index, parseInt(e.target.value) || 0)}
                className="w-24 bg-black/30 border-white/20 text-white text-right"
              />
              <span className="ml-2 text-white">{getMetricLabel(selectedGame)}</span>
            </div>
            <Button 
              variant="outline" 
              size="icon"
              className="hover:bg-destructive/20"
              onClick={() => handleRemovePlayer(index)}
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayersList;
