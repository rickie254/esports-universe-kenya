
import { GameTopPlayers } from "@/types/admin-dashboard";
import PlayerItem from "./PlayerItem";

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
        <PlayerItem
          key={index}
          player={player}
          index={index}
          selectedGame={selectedGame}
          onRatingChange={handlePlayerRatingChange}
          onRemovePlayer={handleRemovePlayer}
        />
      ))}
    </div>
  );
};

export default PlayersList;
