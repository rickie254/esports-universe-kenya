
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
    setGlobalNews
  } = useAdminDashboard();

  return (
    <div className="max-w-7xl mx-auto mt-2 sm:mt-4">
      {isMobile ? null : (
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white text-center animate-scale-in animate-text-color">
          Admin Dashboard
        </h1>
      )}
      
      <div className="animate-fade-up">
        {activeTab === "universities" && (
          <div className="animate-fade-in">
            <UniversityRankingsTab 
              universities={universities} 
              setUniversities={setUniversities} 
            />
          </div>
        )}
        
        {activeTab === "league-table" && (
          <div className="animate-fade-in">
            <LeagueTableTab 
              leagueUniversities={leagueUniversities} 
              setLeagueUniversities={setLeagueUniversities} 
            />
          </div>
        )}
        
        {activeTab === "players" && (
          <div className="animate-fade-in">
            <PlayersTab 
              gameTopPlayers={gameTopPlayers} 
              setGameTopPlayers={setGameTopPlayers} 
            />
          </div>
        )}
        
        {activeTab === "local-news" && (
          <div className="animate-fade-in">
            <NewsTab 
              news={localNews} 
              setNews={setLocalNews} 
              type="local" 
            />
          </div>
        )}
        
        {activeTab === "global-news" && (
          <div className="animate-fade-in">
            <NewsTab 
              news={globalNews} 
              setNews={setGlobalNews} 
              type="global" 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContent;
