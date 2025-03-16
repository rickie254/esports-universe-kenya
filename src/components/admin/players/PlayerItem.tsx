
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { Player } from "@/types/admin-dashboard";
import { getMetricLabel } from "@/utils/game-metrics";

interface PlayerItemProps {
  player: Player;
  index: number;
  selectedGame: string;
  onRatingChange: (index: number, newRating: number) => void;
  onRemovePlayer: (index: number) => void;
}

const PlayerItem = ({ 
  player, 
  index, 
  selectedGame, 
  onRatingChange, 
  onRemovePlayer 
}: PlayerItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg">
      <div>
        <div className="text-lg text-white mb-1">{player.name}</div>
        <div className="text-sm text-gray-400">{player.university}</div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <Input 
            type="number"
            value={player.rating}
            onChange={(e) => onRatingChange(index, parseInt(e.target.value) || 0)}
            className="w-24 bg-black/30 border-white/20 text-white text-right"
          />
          <span className="ml-2 text-white">{getMetricLabel(selectedGame)}</span>
        </div>
        <Button 
          variant="outline" 
          size="icon"
          className="hover:bg-destructive/20"
          onClick={() => onRemovePlayer(index)}
        >
          <Trash2 className="w-4 h-4 text-destructive" />
        </Button>
      </div>
    </div>
  );
};

export default PlayerItem;
