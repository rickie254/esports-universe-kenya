
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface UniversityPoints {
  name: string;
  fifa: number;
  pubg: number;
  callOfDuty: number;
  tekken: number;
  eFootball: number;
  totalPoints: number;
}

interface LeagueTableProps {
  universities: UniversityPoints[];
  isAdmin?: boolean;
  onUpdatePoints?: (university: string, game: string, points: number) => void;
  onRemoveUniversity?: (university: string) => void;
}

const LeagueTable = ({ 
  universities, 
  isAdmin = false, 
  onUpdatePoints, 
  onRemoveUniversity 
}: LeagueTableProps) => {
  // Sort universities by total points (descending)
  const sortedUniversities = [...universities].sort((a, b) => b.totalPoints - a.totalPoints);
  
  const handlePointsChange = (university: string, game: string, value: string) => {
    if (onUpdatePoints) {
      const points = parseInt(value) || 0;
      onUpdatePoints(university, game, points);
    }
  };
  
  return (
    <section className="max-w-7xl mx-auto mt-16 mb-16 animate-fade-up">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white">University Gaming League Table</h2>
        <p className="text-gray-300 mt-2">Comprehensive ranking based on performance across all games</p>
      </div>
      
      <div className="bg-card/90 backdrop-blur-sm rounded-xl p-4 shadow-lg overflow-auto">
        <Table>
          <TableHeader className="bg-muted/80">
            <TableRow>
              <TableHead className="text-white w-16 text-center">Rank</TableHead>
              <TableHead className="text-white">University</TableHead>
              <TableHead className="text-white text-center">
                <div className="flex flex-col items-center">
                  <span>FIFA</span>
                  <span className="text-xs text-gray-400">2v2</span>
                </div>
              </TableHead>
              <TableHead className="text-white text-center">PUBG</TableHead>
              <TableHead className="text-white text-center">
                <div className="flex flex-col items-center">
                  <span>Call of</span>
                  <span>Duty</span>
                </div>
              </TableHead>
              <TableHead className="text-white text-center">Tekken</TableHead>
              <TableHead className="text-white text-center">eFootball</TableHead>
              <TableHead className="text-white text-center">
                <div className="flex flex-col items-center">
                  <span>Total</span>
                  <span>Points</span>
                </div>
              </TableHead>
              {isAdmin && (
                <TableHead className="text-white text-center">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUniversities.map((university, index) => (
              <TableRow 
                key={university.name} 
                className={index % 2 === 0 ? "bg-muted/20" : "bg-muted/10"}
              >
                <TableCell className="text-center font-medium text-white">{index + 1}</TableCell>
                <TableCell className="font-medium text-white">{university.name}</TableCell>
                
                {isAdmin ? (
                  <>
                    <TableCell className="text-center">
                      <input 
                        type="number" 
                        value={university.fifa}
                        onChange={(e) => handlePointsChange(university.name, "fifa", e.target.value)}
                        className="w-16 bg-black/30 border border-white/20 text-white text-center rounded p-1"
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <input 
                        type="number" 
                        value={university.pubg}
                        onChange={(e) => handlePointsChange(university.name, "pubg", e.target.value)}
                        className="w-16 bg-black/30 border border-white/20 text-white text-center rounded p-1"
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <input 
                        type="number" 
                        value={university.callOfDuty}
                        onChange={(e) => handlePointsChange(university.name, "callOfDuty", e.target.value)}
                        className="w-16 bg-black/30 border border-white/20 text-white text-center rounded p-1"
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <input 
                        type="number" 
                        value={university.tekken}
                        onChange={(e) => handlePointsChange(university.name, "tekken", e.target.value)}
                        className="w-16 bg-black/30 border border-white/20 text-white text-center rounded p-1"
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <input 
                        type="number" 
                        value={university.eFootball}
                        onChange={(e) => handlePointsChange(university.name, "eFootball", e.target.value)}
                        className="w-16 bg-black/30 border border-white/20 text-white text-center rounded p-1"
                      />
                    </TableCell>
                    <TableCell className="text-center font-bold text-white">{university.totalPoints}</TableCell>
                    <TableCell className="text-center">
                      <button 
                        onClick={() => onRemoveUniversity && onRemoveUniversity(university.name)}
                        className="text-destructive hover:text-destructive/80 transition-colors"
                      >
                        Remove
                      </button>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell className="text-center text-white">{university.fifa}</TableCell>
                    <TableCell className="text-center text-white">{university.pubg}</TableCell>
                    <TableCell className="text-center text-white">{university.callOfDuty}</TableCell>
                    <TableCell className="text-center text-white">{university.tekken}</TableCell>
                    <TableCell className="text-center text-white">{university.eFootball}</TableCell>
                    <TableCell className="text-center font-bold text-white">{university.totalPoints}</TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default LeagueTable;
