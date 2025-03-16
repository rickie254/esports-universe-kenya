
import { Label } from "@/components/ui/label";

interface GameSelectorProps {
  selectedGame: string;
  onGameChange: (game: string) => void;
}

const GameSelector = ({ selectedGame, onGameChange }: GameSelectorProps) => {
  return (
    <div className="mb-6">
      <Label htmlFor="gameSelect" className="text-white mb-2 block">Select Game</Label>
      <select
        id="gameSelect"
        value={selectedGame}
        onChange={(e) => onGameChange(e.target.value)}
        className="w-full bg-black/30 border border-white/20 text-white rounded p-2"
      >
        <option value="tekken">Tekken</option>
        <option value="fifa">FIFA</option>
        <option value="efootball">eFootball</option>
        <option value="pubg">PUBG</option>
        <option value="codm">Call of Duty Mobile</option>
      </select>
    </div>
  );
};

export default GameSelector;
