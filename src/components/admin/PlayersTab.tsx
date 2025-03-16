
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Player {
  name: string; 
  university: string; 
  rating: number;
}

interface GameTopPlayers {
  tekken: Player[];
  fifa: Player[];
  efootball: Player[];
  pubg: Player[];
  codm: Player[];
  [key: string]: Player[];
}

interface PlayersTabProps {
  gameTopPlayers: GameTopPlayers;
  setGameTopPlayers: React.Dispatch<React.SetStateAction<GameTopPlayers>>;
}

const PlayersTab = ({
  gameTopPlayers,
  setGameTopPlayers
}: PlayersTabProps) => {
  const { toast } = useToast();
  const [selectedGame, setSelectedGame] = useState("tekken");
  const [newPlayer, setNewPlayer] = useState<Player>({ name: "", university: "", rating: 0 });

  const getMetricLabel = (game: string) => {
    switch (game) {
      case "tekken":
        return "Wins";
      case "fifa":
      case "efootball":
        return "Goals";
      case "pubg":
      case "codm":
        return "Kills";
      default:
        return "Points";
    }
  };

  const getDefaultRating = (game: string) => {
    switch (game) {
      case "tekken":
        return 0; // Wins
      case "fifa":
      case "efootball":
        return 0; // Goals
      case "pubg":
      case "codm":
        return 0; // Kills
      default:
        return 0;
    }
  };

  // Reset new player rating when game changes
  const handleGameChange = (game: string) => {
    setSelectedGame(game);
    setNewPlayer({
      ...newPlayer,
      rating: getDefaultRating(game)
    });
  };

  // Add new player
  const handleAddPlayer = () => {
    if (!newPlayer.name || !newPlayer.university) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Player name and university are required",
      });
      return;
    }
    
    const updatedGameTopPlayers = { ...gameTopPlayers };
    updatedGameTopPlayers[selectedGame] = [
      ...updatedGameTopPlayers[selectedGame],
      {
        name: newPlayer.name,
        university: newPlayer.university,
        rating: newPlayer.rating || 0,
      },
    ];
    
    setGameTopPlayers(updatedGameTopPlayers);
    setNewPlayer({ name: "", university: "", rating: getDefaultRating(selectedGame) });
    
    toast({
      title: "Player added",
      description: `${newPlayer.name} has been added to ${selectedGame.toUpperCase()}`,
    });
  };

  // Remove player
  const handleRemovePlayer = (game: string, index: number) => {
    const updatedGameTopPlayers = { ...gameTopPlayers };
    updatedGameTopPlayers[game] = [...updatedGameTopPlayers[game]];
    updatedGameTopPlayers[game].splice(index, 1);
    
    setGameTopPlayers(updatedGameTopPlayers);
    
    toast({
      title: "Player removed",
      description: `Player has been removed from ${game.toUpperCase()}`,
    });
  };

  return (
    <div className="glass-card rounded-xl p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-white">Game Players</h2>
      
      {/* Game selection */}
      <div className="mb-6">
        <Label htmlFor="gameSelect" className="text-white mb-2 block">Select Game</Label>
        <select
          id="gameSelect"
          value={selectedGame}
          onChange={(e) => handleGameChange(e.target.value)}
          className="w-full bg-black/30 border border-white/20 text-white rounded p-2"
        >
          <option value="tekken">Tekken</option>
          <option value="fifa">FIFA</option>
          <option value="efootball">eFootball</option>
          <option value="pubg">PUBG</option>
          <option value="codm">Call of Duty Mobile</option>
        </select>
      </div>
      
      {/* Add new player */}
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
        <Button onClick={handleAddPlayer} className="bg-accent hover:bg-accent/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Player
        </Button>
      </div>
      
      {/* Player list */}
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
                  onChange={(e) => {
                    const updatedGameTopPlayers = { ...gameTopPlayers };
                    updatedGameTopPlayers[selectedGame][index].rating = parseInt(e.target.value) || 0;
                    setGameTopPlayers(updatedGameTopPlayers);
                  }}
                  className="w-24 bg-black/30 border-white/20 text-white text-right"
                />
                <span className="ml-2 text-white">{getMetricLabel(selectedGame)}</span>
              </div>
              <Button 
                variant="outline" 
                size="icon"
                className="hover:bg-destructive/20"
                onClick={() => handleRemovePlayer(selectedGame, index)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayersTab;
