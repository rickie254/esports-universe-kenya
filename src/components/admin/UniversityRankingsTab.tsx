
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface UniversityRankingsTabProps {
  universities: Array<{ name: string; rank: number; change: string; points: number }>;
  setUniversities: React.Dispatch<React.SetStateAction<Array<{ name: string; rank: number; change: string; points: number }>>>;
}

const UniversityRankingsTab = ({ universities, setUniversities }: UniversityRankingsTabProps) => {
  const { toast } = useToast();
  const [newUniversity, setNewUniversity] = useState({ name: "", points: 0 });

  // Add new university
  const handleAddUniversity = () => {
    if (!newUniversity.name) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "University name is required",
      });
      return;
    }
    
    const newRank = universities.length + 1;
    setUniversities([
      ...universities,
      {
        name: newUniversity.name,
        rank: newRank,
        change: "new",
        points: newUniversity.points || 1000,
      },
    ]);
    
    setNewUniversity({ name: "", points: 0 });
    
    toast({
      title: "University added",
      description: `${newUniversity.name} has been added to the rankings`,
    });
  };

  // Remove university
  const handleRemoveUniversity = (index: number) => {
    const updatedUniversities = [...universities];
    updatedUniversities.splice(index, 1);
    
    // Update ranks
    const rerankedUniversities = updatedUniversities.map((uni, idx) => ({
      ...uni,
      rank: idx + 1,
    }));
    
    setUniversities(rerankedUniversities);
    
    toast({
      title: "University removed",
      description: "University has been removed from the rankings",
    });
  };

  return (
    <div className="glass-card rounded-xl p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-white">University Rankings</h2>
      
      {/* Add new university */}
      <div className="mb-8 p-4 bg-black/30 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-white">Add New University</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="universityName" className="text-white mb-2 block">University Name</Label>
            <Input 
              id="universityName"
              value={newUniversity.name}
              onChange={(e) => setNewUniversity({ ...newUniversity, name: e.target.value })}
              placeholder="Enter university name"
              className="bg-black/30 border-white/20 text-white"
            />
          </div>
          <div>
            <Label htmlFor="universityPoints" className="text-white mb-2 block">Points</Label>
            <Input 
              id="universityPoints"
              type="number"
              value={newUniversity.points}
              onChange={(e) => setNewUniversity({ ...newUniversity, points: parseInt(e.target.value) || 0 })}
              placeholder="Enter points"
              className="bg-black/30 border-white/20 text-white"
            />
          </div>
        </div>
        <Button onClick={handleAddUniversity} className="bg-accent hover:bg-accent/90">
          <Plus className="w-4 h-4 mr-2" />
          Add University
        </Button>
      </div>
      
      {/* University list */}
      <div className="space-y-4">
        {universities.map((uni, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-black/40 rounded-lg">
            <div className="flex items-center">
              <span className="text-lg font-semibold mr-4 text-white">#{uni.rank}</span>
              <span className="text-lg text-white">{uni.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Input 
                  type="number"
                  value={uni.points}
                  onChange={(e) => {
                    const updatedUniversities = [...universities];
                    updatedUniversities[index].points = parseInt(e.target.value) || 0;
                    setUniversities(updatedUniversities);
                  }}
                  className="w-24 bg-black/30 border-white/20 text-white text-right"
                />
                <span className="ml-2 text-white">pts</span>
              </div>
              <select
                value={uni.change}
                onChange={(e) => {
                  const updatedUniversities = [...universities];
                  updatedUniversities[index].change = e.target.value;
                  setUniversities(updatedUniversities);
                }}
                className="bg-black/30 border border-white/20 text-white rounded p-2"
              >
                <option value="up">Up</option>
                <option value="down">Down</option>
                <option value="same">Same</option>
                <option value="new">New</option>
              </select>
              <Button 
                variant="outline" 
                size="icon"
                className="hover:bg-destructive/20"
                onClick={() => handleRemoveUniversity(index)}
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

export default UniversityRankingsTab;
