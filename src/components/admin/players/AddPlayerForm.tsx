
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Player } from "@/types/admin-dashboard";
import { getMetricLabel, getDefaultRating } from "@/utils/game-metrics";

interface AddPlayerFormProps {
  selectedGame: string;
  newPlayer: Player;
  setNewPlayer: React.Dispatch<React.SetStateAction<Player>>;
  onAddPlayer: () => void;
}

const AddPlayerForm = ({ 
  selectedGame, 
  newPlayer, 
  setNewPlayer, 
  onAddPlayer 
}: AddPlayerFormProps) => {
  return (
    <div className="mb-8 p-4 bg-black/30 rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-white">Add New Player</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <Label htmlFor="playerName" className="text-white mb-2 block">Player Name</Label>
          <Input 
            id="playerName"
            value={newPlayer.name}
            onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
            placeholder="Enter player name"
            className="bg-black/30 border-white/20 text-white"
          />
        </div>
        <div>
          <Label htmlFor="playerUniversity" className="text-white mb-2 block">University</Label>
          <Input 
            id="playerUniversity"
            value={newPlayer.university}
            onChange={(e) => setNewPlayer({ ...newPlayer, university: e.target.value })}
            placeholder="Enter university"
            className="bg-black/30 border-white/20 text-white"
          />
        </div>
        <div>
          <Label htmlFor="playerRating" className="text-white mb-2 block">{getMetricLabel(selectedGame)}</Label>
          <Input 
            id="playerRating"
            type="number"
            value={newPlayer.rating}
            onChange={(e) => setNewPlayer({ ...newPlayer, rating: parseInt(e.target.value) || 0 })}
            placeholder={`Enter ${getMetricLabel(selectedGame).toLowerCase()}`}
            className="bg-black/30 border-white/20 text-white"
          />
        </div>
      </div>
      <Button onClick={onAddPlayer} className="bg-accent hover:bg-accent/90">
        <Plus className="w-4 h-4 mr-2" />
        Add Player
      </Button>
    </div>
  );
};

export default AddPlayerForm;
