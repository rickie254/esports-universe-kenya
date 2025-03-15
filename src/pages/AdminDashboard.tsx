
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";
import UniversityRankingsTab from "@/components/admin/UniversityRankingsTab";
import LeagueTableTab from "@/components/admin/LeagueTableTab";
import PlayersTab from "@/components/admin/PlayersTab";
import NewsTab from "@/components/admin/NewsTab";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useIsMobile } from "@/hooks/use-mobile";

// Admin protected route check
const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const [universities, setUniversities] = useState([
    { name: "University of Nairobi", rank: 1, change: "up", points: 2500 },
    { name: "Strathmore University", rank: 2, change: "down", points: 2400 },
    { name: "Kenyatta University", rank: 3, change: "up", points: 2300 },
    { name: "JKUAT", rank: 4, change: "same", points: 2200 },
  ]);
  
  const [leagueUniversities, setLeagueUniversities] = useState([
    { 
      name: "University of Nairobi", 
      logo: "https://www.uonbi.ac.ke/sites/default/files/UoN%20logo.png",
      fifa: 30, 
      pubg: 25, 
      callOfDuty: 28, 
      tekken: 22, 
      eFootball: 20, 
      totalPoints: 125 
    },
    { 
      name: "Strathmore University", 
      logo: "https://strathmore.edu/wp-content/uploads/2016/10/Strathmore-logo-1.png",
      fifa: 28, 
      pubg: 20, 
      callOfDuty: 25, 
      tekken: 18, 
      eFootball: 24, 
      totalPoints: 115 
    },
    { 
      name: "Kenyatta University", 
      logo: "https://www.ku.ac.ke/images/KU-Logo.png",
      fifa: 22, 
      pubg: 26, 
      callOfDuty: 20, 
      tekken: 24, 
      eFootball: 18, 
      totalPoints: 110 
    },
    { 
      name: "JKUAT", 
      logo: "https://www.jkuat.ac.ke/wp-content/uploads/2014/05/JKUAT-Logo-Sept-2018.png",
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
  
  const [activeTab, setActiveTab] = useState("universities");
  
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
  
  const handleSaveChanges = () => {
    toast({
      title: "Changes saved",
      description: "Your changes have been saved successfully",
    });
    
    localStorage.setItem("universities", JSON.stringify(universities));
    localStorage.setItem("gameTopPlayers", JSON.stringify(gameTopPlayers));
    localStorage.setItem("localNews", JSON.stringify(localNews));
    localStorage.setItem("globalNews", JSON.stringify(globalNews));
  };
  
  return (
    <div className={`flex flex-col ${!isMobile && "md:flex-row"} min-h-screen bg-black/5`}>
      <AdminSidebar />
      
      <div className="flex-1 py-4 sm:py-8 px-3 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-black/50 -z-10" />
        
        <div className="max-w-7xl mx-auto mb-4 sm:mb-6 flex justify-between items-center animate-fade-in flex-wrap gap-2">
          <Link to="/" className="text-white flex items-center gap-2 hover:text-accent transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm sm:text-base">Back to Site</span>
          </Link>
          
          <Button 
            variant="outline" 
            className="glass-card hover:bg-accent/20 text-sm sm:text-base py-1 px-2 h-9 sm:h-10"
            onClick={handleSaveChanges}
          >
            <Save className="w-4 h-4 mr-1 sm:mr-2" />
            Save
          </Button>
        </div>
        
        <div className="max-w-7xl mx-auto mt-4">
          {isMobile ? null : (
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white text-center animate-scale-in">
              Admin Dashboard
            </h1>
          )}
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-up">
            <TabsList className="hidden">
              <TabsTrigger value="universities">Universities</TabsTrigger>
              <TabsTrigger value="league-table">League Table</TabsTrigger>
              <TabsTrigger value="players">Players</TabsTrigger>
              <TabsTrigger value="local-news">Local News</TabsTrigger>
              <TabsTrigger value="global-news">Global News</TabsTrigger>
            </TabsList>
            
            <TabsContent value="universities" className="animate-fade-in">
              <UniversityRankingsTab 
                universities={universities} 
                setUniversities={setUniversities} 
              />
            </TabsContent>
            
            <TabsContent value="league-table" className="animate-fade-in">
              <LeagueTableTab 
                leagueUniversities={leagueUniversities} 
                setLeagueUniversities={setLeagueUniversities} 
              />
            </TabsContent>
            
            <TabsContent value="players" className="animate-fade-in">
              <PlayersTab 
                gameTopPlayers={gameTopPlayers} 
                setGameTopPlayers={setGameTopPlayers} 
              />
            </TabsContent>
            
            <TabsContent value="local-news" className="animate-fade-in">
              <NewsTab 
                news={localNews} 
                setNews={setLocalNews} 
                type="local" 
              />
            </TabsContent>
            
            <TabsContent value="global-news" className="animate-fade-in">
              <NewsTab 
                news={globalNews} 
                setNews={setGlobalNews} 
                type="global" 
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
