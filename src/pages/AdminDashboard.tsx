import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import LeagueTable from "@/components/LeagueTable";

// Admin protected route check
const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [universities, setUniversities] = useState([
    { name: "University of Nairobi", rank: 1, change: "up", points: 2500 },
    { name: "Strathmore University", rank: 2, change: "down", points: 2400 },
    { name: "Kenyatta University", rank: 3, change: "up", points: 2300 },
    { name: "JKUAT", rank: 4, change: "same", points: 2200 },
  ]);
  
  const [leagueUniversities, setLeagueUniversities] = useState([
    { 
      name: "University of Nairobi", 
      fifa: 30, 
      pubg: 25, 
      callOfDuty: 28, 
      tekken: 22, 
      eFootball: 20, 
      totalPoints: 125 
    },
    { 
      name: "Strathmore University", 
      fifa: 28, 
      pubg: 20, 
      callOfDuty: 25, 
      tekken: 18, 
      eFootball: 24, 
      totalPoints: 115 
    },
    { 
      name: "Kenyatta University", 
      fifa: 22, 
      pubg: 26, 
      callOfDuty: 20, 
      tekken: 24, 
      eFootball: 18, 
      totalPoints: 110 
    },
    { 
      name: "JKUAT", 
      fifa: 24, 
      pubg: 22, 
      callOfDuty: 18, 
      tekken: 20, 
      eFootball: 21, 
      totalPoints: 105 
    },
  ]);
  
  const [gameTopPlayers, setGameTopPlayers] = useState({
    tekken: [
      { name: "John Doe", university: "UoN", rating: 2800 },
      { name: "Jane Smith", university: "Strathmore", rating: 2750 },
      { name: "Mike Johnson", university: "KU", rating: 2700 },
    ],
    fifa: [
      { name: "Alice Brown", university: "JKUAT", rating: 2850 },
      { name: "Bob Wilson", university: "UoN", rating: 2800 },
      { name: "Carol White", university: "Strathmore", rating: 2780 },
    ],
    efootball: [
      { name: "David Lee", university: "KU", rating: 2900 },
      { name: "Emma Davis", university: "UoN", rating: 2850 },
      { name: "Frank Miller", university: "JKUAT", rating: 2820 },
    ],
    pubg: [
      { name: "Grace Kim", university: "Strathmore", rating: 2750 },
      { name: "Henry Park", university: "UoN", rating: 2700 },
      { name: "Ivy Chen", university: "KU", rating: 2680 },
    ],
    codm: [
      { name: "Jack Thompson", university: "JKUAT", rating: 2950 },
      { name: "Kelly Moore", university: "Strathmore", rating: 2900 },
      { name: "Liam Wilson", university: "UoN", rating: 2880 },
    ],
  });
  
  const [localNews, setLocalNews] = useState([
    { title: "UoN Dominates Regional Tournament", date: "2024-03-10", type: "local" },
    { title: "New Esports Arena Opens at Strathmore", date: "2024-03-08", type: "local" },
    { title: "KU Team Qualifies for Continental Championship", date: "2024-03-05", type: "local" },
  ]);
  
  const [globalNews, setGlobalNews] = useState([
    { title: "Major Updates Coming to PUBG Mobile", date: "2024-03-10", type: "global" },
    { title: "FIFA 24 Global Series Announced", date: "2024-03-09", type: "global" },
    { title: "New Tekken Tournament Circuit Revealed", date: "2024-03-07", type: "global" },
  ]);
  
  // New items placeholders
  const [newUniversity, setNewUniversity] = useState({ name: "", points: 0 });
  const [newLeagueUniversity, setNewLeagueUniversity] = useState({ 
    name: "", 
    fifa: 0, 
    pubg: 0, 
    callOfDuty: 0, 
    tekken: 0, 
    eFootball: 0
  });
  const [newLocalNews, setNewLocalNews] = useState({ title: "", date: new Date().toISOString().split('T')[0] });
  const [newGlobalNews, setNewGlobalNews] = useState({ title: "", date: new Date().toISOString().split('T')[0] });
  const [selectedGame, setSelectedGame] = useState("tekken");
  const [newPlayer, setNewPlayer] = useState({ name: "", university: "", rating: 2000 });
  
  // Check if admin is authenticated
  useEffect(() => {
    const isAdmin = localStorage.getItem("adminAuthenticated") === "true";
    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "Access denied",
        description: "You must be logged in as an admin to view this page",
      });
      navigate("/admin-login");
    }
  }, [navigate, toast]);
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/");
  };
  
  // Save updates (in a real app, this would save to a database)
  const handleSaveChanges = () => {
    // In a real application, this would make API calls to update the database
    // For now, we'll just show a success message
    toast({
      title: "Changes saved",
      description: "Your changes have been saved successfully",
    });
    
    // Simulate saving to localStorage
    localStorage.setItem("universities", JSON.stringify(universities));
    localStorage.setItem("gameTopPlayers", JSON.stringify(gameTopPlayers));
    localStorage.setItem("localNews", JSON.stringify(localNews));
    localStorage.setItem("globalNews", JSON.stringify(globalNews));
  };
  
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
        rating: newPlayer.rating || 2000,
      },
    ];
    
    setGameTopPlayers(updatedGameTopPlayers);
    setNewPlayer({ name: "", university: "", rating: 2000 });
    
    toast({
      title: "Player added",
      description: `${newPlayer.name} has been added to ${selectedGame.toUpperCase()}`,
    });
  };
  
  // Add new local news
  const handleAddLocalNews = () => {
    if (!newLocalNews.title) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "News title is required",
      });
      return;
    }
    
    setLocalNews([
      {
        title: newLocalNews.title,
        date: newLocalNews.date,
        type: "local",
      },
      ...localNews,
    ]);
    
    setNewLocalNews({ title: "", date: new Date().toISOString().split('T')[0] });
    
    toast({
      title: "Local news added",
      description: "Your news item has been added successfully",
    });
  };
  
  // Add new global news
  const handleAddGlobalNews = () => {
    if (!newGlobalNews.title) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "News title is required",
      });
      return;
    }
    
    setGlobalNews([
      {
        title: newGlobalNews.title,
        date: newGlobalNews.date,
        type: "global",
      },
      ...globalNews,
    ]);
    
    setNewGlobalNews({ title: "", date: new Date().toISOString().split('T')[0] });
    
    toast({
      title: "Global news added",
      description: "Your news item has been added successfully",
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
  
  // Remove news
  const handleRemoveNews = (isLocal: boolean, index: number) => {
    if (isLocal) {
      const updatedLocalNews = [...localNews];
      updatedLocalNews.splice(index, 1);
      setLocalNews(updatedLocalNews);
    } else {
      const updatedGlobalNews = [...globalNews];
      updatedGlobalNews.splice(index, 1);
      setGlobalNews(updatedGlobalNews);
    }
    
    toast({
      title: "News removed",
      description: "News item has been removed successfully",
    });
  };
  
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
    
    setLeagueUniversities(updatedLeagueUniversities);
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
    
    setLeagueUniversities([
      ...leagueUniversities,
      {
        ...newLeagueUniversity,
        totalPoints
      }
    ]);
    
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
  
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50 -z-10" />
      
      {/* Header with navigation */}
      <div className="max-w-7xl mx-auto mb-8 flex justify-between items-center animate-fade-in">
        <Link to="/" className="text-white flex items-center gap-2 hover:text-accent transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Site</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            className="glass-card hover:bg-accent/20"
            onClick={handleSaveChanges}
          >
            <Save className="w-4 h-4 mr-2" />
            Save All Changes
          </Button>
          
          <Button 
            variant="outline" 
            className="glass-card hover:bg-destructive/20"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white text-center animate-scale-in">Admin Dashboard</h1>
        
        <Tabs defaultValue="universities" className="animate-fade-up">
          <TabsList className="grid grid-cols-5 glass-card mb-8">
            <TabsTrigger value="universities">Universities</TabsTrigger>
            <TabsTrigger value="league-table">League Table</TabsTrigger>
            <TabsTrigger value="players">Players</TabsTrigger>
            <TabsTrigger value="local-news">Local News</TabsTrigger>
            <TabsTrigger value="global-news">Global News</TabsTrigger>
          </TabsList>
          
          {/* Universities Tab */}
          <TabsContent value="universities" className="animate-fade-in">
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
          </TabsContent>
          
          {/* League Table Tab */}
          <TabsContent value="league-table" className="animate-fade-in">
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
          </TabsContent>
          
          {/* Players Tab */}
          <TabsContent value="players" className="animate-fade-in">
            <div className="glass-card rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Game Players</h2>
              
              {/* Game selection */}
              <div className="mb-6">
                <Label htmlFor="gameSelect" className="text-white mb-2 block">Select Game</Label>
                <select
                  id="gameSelect"
                  value={selectedGame}
                  onChange={(e) => setSelectedGame(e.target.value)}
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
                    <Label htmlFor="playerRating" className="text-white mb-2 block">Rating</Label>
                    <Input 
                      id="playerRating"
                      type="number"
                      value={newPlayer.rating}
                      onChange={(e) => setNewPlayer({ ...newPlayer, rating: parseInt(e.target.value) || 0 })}
                      placeholder="Enter rating"
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
                        <span className="ml-2 text-white">MMR</span>
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
          </TabsContent>
          
          {/* Local News Tab */}
          <TabsContent value="local-news" className="animate-fade-in">
            <div className="glass-card rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Local Esports News</h2>
              
              {/* Add new local news */}
              <div className="mb-8 p-4 bg-black/30 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-white">Add New Local News</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="localNewsTitle" className="text-white mb-2 block">News Title</Label>
                    <Input 
                      id="localNewsTitle"
                      value={newLocalNews.title}
                      onChange={(e) => setNewLocalNews({ ...newLocalNews, title: e.target.value })}
                      placeholder="Enter news title"
                      className="bg-black/30 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="localNewsDate" className="text-white mb-2 block">Date</Label>
                    <Input 
                      id="localNewsDate"
                      type="date"
                      value={newLocalNews.date}
                      onChange={(e) => setNewLocalNews({ ...newLocalNews, date: e.target.value })}
                      className="bg-black/30 border-white/20 text-white"
                    />
                  </div>
                </div>
                <Button onClick={handleAddLocalNews} className="bg-accent hover:bg-accent/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add News
                </Button>
              </div>
              
              {/* Local news list */}
              <div className="space-y-4">
                {localNews.map((news, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-black/40 rounded-lg">
                    <div>
                      <Input 
                        value={news.title}
                        onChange={(e) => {
                          const updatedLocalNews = [...localNews];
                          updatedLocalNews[index].title = e.target.value;
                          setLocalNews(updatedLocalNews);
                        }}
                        className="bg-black/30 border-white/20 text-white mb-2"
                      />
                      <Input 
                        type="date"
                        value={news.date}
                        onChange={(e) => {
                          const updatedLocalNews = [...localNews];
                          updatedLocalNews[index].date = e.target.value;
                          setLocalNews(updatedLocalNews);
                        }}
                        className="w-40 bg-black/30 border-white/20 text-white"
                      />
                    </div>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="hover:bg-destructive/20"
                      onClick={() => handleRemoveNews(true, index)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Global News Tab */}
          <TabsContent value="global-news" className="animate-fade-in">
            <div className="glass-card rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Global Esports News</h2>
              
              {/* Add new global news */}
              <div className="mb-8 p-4 bg-black/30 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-white">Add New Global News</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="globalNewsTitle" className="text-white mb-2 block">News Title</Label>
                    <Input 
                      id="globalNewsTitle"
                      value={newGlobalNews.title}
                      onChange={(e) => setNewGlobalNews({ ...newGlobalNews, title: e.target.value })}
                      placeholder="Enter news title"
                      className="bg-black/30 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="globalNewsDate" className="text-white mb-2 block">Date</Label>
                    <Input 
                      id="globalNewsDate"
                      type="date"
                      value={newGlobalNews.date}
                      onChange={(e) => setNewGlobalNews({ ...newGlobalNews, date: e.target.
