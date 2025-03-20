
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UniversityRankingsTab from "@/components/admin/UniversityRankingsTab";
import LeagueTableTab from "@/components/admin/LeagueTableTab";
import PlayersTab from "@/components/admin/PlayersTab";
import NewsTab from "@/components/admin/NewsTab";
import { useAdminDashboard } from "@/contexts/AdminDashboardContext";
import { useIsMobile } from "@/hooks/use-mobile";

const AdminContent = () => {
  const isMobile = useIsMobile();
  const { 
    activeTab,
    universities, 
    leagueUniversities, 
    gameTopPlayers, 
    localNews, 
    globalNews,
    setUniversities, 
    setLeagueUniversities, 
    setGameTopPlayers, 
    setLocalNews, 
    setGlobalNews,
    setActiveTab
  } = useAdminDashboard();

  return (
    <div className="max-w-7xl mx-auto mt-2 sm:mt-4">
      {isMobile ? null : (
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white text-center animate-scale-in animate-text-color">
          Admin Dashboard
        </h1>
      )}
      
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)} className="animate-fade-up">
        <TabsList className="grid grid-cols-5 gap-2 bg-black/30 p-1 mb-6">
          <TabsTrigger value="universities" className="text-white data-[state=active]:bg-accent hover:text-accent animate-text-color">Universities</TabsTrigger>
          <TabsTrigger value="league-table" className="text-white data-[state=active]:bg-accent hover:text-accent animate-text-color">League Table</TabsTrigger>
          <TabsTrigger value="players" className="text-white data-[state=active]:bg-accent hover:text-accent animate-text-color">Players</TabsTrigger>
          <TabsTrigger value="local-news" className="text-white data-[state=active]:bg-accent hover:text-accent animate-text-color">Local News</TabsTrigger>
          <TabsTrigger value="global-news" className="text-white data-[state=active]:bg-accent hover:text-accent animate-text-color">Global News</TabsTrigger>
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
  );
};

export default AdminContent;
