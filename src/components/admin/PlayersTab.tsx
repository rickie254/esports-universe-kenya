
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { GameTopPlayers, Player } from "@/types/admin-dashboard";
import { getDefaultRating } from "@/utils/game-metrics";
import GameSelector from "./players/GameSelector";
import AddPlayerForm from "./players/AddPlayerForm";
import PlayersList from "./players/PlayersList";

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

  // Handle game change
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

  return (
    <div className="glass-card rounded-xl p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-white">Game Players</h2>
      
      <GameSelector 
        selectedGame={selectedGame} 
        onGameChange={handleGameChange} 
      />
      
      <AddPlayerForm 
        selectedGame={selectedGame}
        newPlayer={newPlayer}
        setNewPlayer={setNewPlayer}
        onAddPlayer={handleAddPlayer}
      />
      
      <PlayersList 
        selectedGame={selectedGame}
        gameTopPlayers={gameTopPlayers}
        setGameTopPlayers={setGameTopPlayers}
      />
    </div>
  );
};

export default PlayersTab;
