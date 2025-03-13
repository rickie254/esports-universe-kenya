
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import LeagueTable from "@/components/LeagueTable";

interface LeagueTableTabProps {
  leagueUniversities: Array<{
    name: string;
    fifa: number;
    pubg: number;
    callOfDuty: number;
    tekken: number;
    eFootball: number;
    totalPoints: number;
  }>;
  setLeagueUniversities: React.Dispatch<React.SetStateAction<Array<{
    name: string;
    fifa: number;
    pubg: number;
    callOfDuty: number;
    tekken: number;
    eFootball: number;
    totalPoints: number;
  }>>>;
}

const LeagueTableTab = ({ 
  leagueUniversities, 
  setLeagueUniversities 
}: LeagueTableTabProps) => {
  const { toast } = useToast();
  const [newLeagueUniversity, setNewLeagueUniversity] = useState({ 
    name: "", 
    fifa: 0, 
    pubg: 0, 
    callOfDuty: 0, 
    tekken: 0, 
    eFootball: 0
  });

  // Update points in the league table
  const handleUpdateLeaguePoints = (university: string, game: string, points: number) => {
    const updatedLeagueUniversities = leagueUniversities.map(uni => {
      if (uni.name === university) {
        const updatedUni = { ...uni, [game]: points };
        // Recalculate total points
        updatedUni.totalPoints = 
          updatedUni.fifa + 
          updatedUni.pubg + 
          updatedUni.callOfDuty + 
          updatedUni.tekken + 
          updatedUni.eFootball;
        return updatedUni;
      }
      return uni;
    });
    
    // Sort universities by total points (highest to lowest)
    const sortedUniversities = [...updatedLeagueUniversities].sort(
      (a, b) => b.totalPoints - a.totalPoints
    );
    
    setLeagueUniversities(sortedUniversities);
  };

  // Remove university from league table
  const handleRemoveLeagueUniversity = (university: string) => {
    const updatedLeagueUniversities = leagueUniversities.filter(
      uni => uni.name !== university
    );
    
    setLeagueUniversities(updatedLeagueUniversities);
    
    toast({
      title: "University removed",
      description: `${university} has been removed from the league table`,
    });
  };

  // Add new university to league table
  const handleAddLeagueUniversity = () => {
    if (!newLeagueUniversity.name) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "University name is required",
      });
      return;
    }
    
    // Calculate total points
    const totalPoints = 
      newLeagueUniversity.fifa + 
      newLeagueUniversity.pubg + 
      newLeagueUniversity.callOfDuty + 
      newLeagueUniversity.tekken + 
      newLeagueUniversity.eFootball;
    
    const newUniversityWithTotal = {
      ...newLeagueUniversity,
      totalPoints
    };
    
    // Add new university and sort by total points
    const updatedUniversities = [...leagueUniversities, newUniversityWithTotal]
      .sort((a, b) => b.totalPoints - a.totalPoints);
    
    setLeagueUniversities(updatedUniversities);
    
    // Reset form
    setNewLeagueUniversity({ 
      name: "", 
      fifa: 0, 
      pubg: 0, 
      callOfDuty: 0, 
      tekken: 0, 
      eFootball: 0
    });
    
    toast({
      title: "University added",
      description: `${newLeagueUniversity.name} has been added to the league table`,
    });
  };

  // Ensure the universities list is sorted on component mount
  useEffect(() => {
    if (leagueUniversities.length > 0) {
      const sortedUniversities = [...leagueUniversities].sort(
        (a, b) => b.totalPoints - a.totalPoints
      );
      
      // Only update if the order has changed
      const orderChanged = sortedUniversities.some(
        (uni, index) => uni.name !== leagueUniversities[index]?.name
      );
      
      if (orderChanged) {
        setLeagueUniversities(sortedUniversities);
      }
    }
  }, []);

  return (
    <div className="glass-card rounded-xl p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-white">Gaming League Table</h2>
      
      {/* Add new university to league table */}
      <div className="mb-8 p-4 bg-black/30 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-white">Add New University</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="leagueUniversityName" className="text-white mb-2 block">University Name</Label>
            <Input 
              id="leagueUniversityName"
              value={newLeagueUniversity.name}
              onChange={(e) => setNewLeagueUniversity({ ...newLeagueUniversity, name: e.target.value })}
              placeholder="Enter university name"
              className="bg-black/30 border-white/20 text-white"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
          <div>
            <Label htmlFor="fifaPoints" className="text-white mb-2 block">FIFA Points</Label>
            <Input 
              id="fifaPoints"
              type="number"
              value={newLeagueUniversity.fifa}
              onChange={(e) => setNewLeagueUniversity({ ...newLeagueUniversity, fifa: parseInt(e.target.value) || 0 })}
              placeholder="Enter points"
              className="bg-black/30 border-white/20 text-white"
            />
          </div>
          <div>
            <Label htmlFor="pubgPoints" className="text-white mb-2 block">PUBG Points</Label>
            <Input 
              id="pubgPoints"
              type="number"
              value={newLeagueUniversity.pubg}
              onChange={(e) => setNewLeagueUniversity({ ...newLeagueUniversity, pubg: parseInt(e.target.value) || 0 })}
              placeholder="Enter points"
              className="bg-black/30 border-white/20 text-white"
            />
          </div>
          <div>
            <Label htmlFor="codPoints" className="text-white mb-2 block">Call of Duty Points</Label>
            <Input 
              id="codPoints"
              type="number"
              value={newLeagueUniversity.callOfDuty}
              onChange={(e) => setNewLeagueUniversity({ ...newLeagueUniversity, callOfDuty: parseInt(e.target.value) || 0 })}
              placeholder="Enter points"
              className="bg-black/30 border-white/20 text-white"
            />
          </div>
          <div>
            <Label htmlFor="tekkenPoints" className="text-white mb-2 block">Tekken Points</Label>
            <Input 
              id="tekkenPoints"
              type="number"
              value={newLeagueUniversity.tekken}
              onChange={(e) => setNewLeagueUniversity({ ...newLeagueUniversity, tekken: parseInt(e.target.value) || 0 })}
              placeholder="Enter points"
              className="bg-black/30 border-white/20 text-white"
            />
          </div>
          <div>
            <Label htmlFor="eFootballPoints" className="text-white mb-2 block">eFootball Points</Label>
            <Input 
              id="eFootballPoints"
              type="number"
              value={newLeagueUniversity.eFootball}
              onChange={(e) => setNewLeagueUniversity({ ...newLeagueUniversity, eFootball: parseInt(e.target.value) || 0 })}
              placeholder="Enter points"
              className="bg-black/30 border-white/20 text-white"
            />
          </div>
        </div>
        
        <Button onClick={handleAddLeagueUniversity} className="bg-accent hover:bg-accent/90">
          <Plus className="w-4 h-4 mr-2" />
          Add University
        </Button>
      </div>
      
      {/* League table */}
      <LeagueTable 
        universities={leagueUniversities} 
        isAdmin={true}
        onUpdatePoints={handleUpdateLeaguePoints}
        onRemoveUniversity={handleRemoveLeagueUniversity}
      />
    </div>
  );
};

export default LeagueTableTab;
