
import { createContext, useContext, ReactNode, useState } from "react";
import { 
  University, 
  LeagueUniversity, 
  Player, 
  GameTopPlayers, 
  NewsItem, 
  AdminDashboardState 
} from "@/types/admin-dashboard";
import { initialAdminDashboardState } from "@/data/admin-dashboard-data";
import { saveAdminDashboardChanges } from "@/utils/admin-dashboard-utils";

// Re-export types for components that import directly from context
export type { 
  University, 
  LeagueUniversity, 
  Player, 
  GameTopPlayers, 
  NewsItem 
};

interface AdminDashboardContextType extends AdminDashboardState {
  // Setters
  setUniversities: React.Dispatch<React.SetStateAction<University[]>>;
  setLeagueUniversities: React.Dispatch<React.SetStateAction<LeagueUniversity[]>>;
  setGameTopPlayers: React.Dispatch<React.SetStateAction<GameTopPlayers>>;
  setLocalNews: React.Dispatch<React.SetStateAction<NewsItem[]>>;
  setGlobalNews: React.Dispatch<React.SetStateAction<NewsItem[]>>;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  
  // Actions
  handleSaveChanges: () => void;
}

const AdminDashboardContext = createContext<AdminDashboardContextType | undefined>(undefined);

export const AdminDashboardProvider = ({ children }: { children: ReactNode }) => {
  // Extract individual state slices from initial state
  const [universities, setUniversities] = useState<University[]>(initialAdminDashboardState.universities);
  const [leagueUniversities, setLeagueUniversities] = useState<LeagueUniversity[]>(initialAdminDashboardState.leagueUniversities);
  const [gameTopPlayers, setGameTopPlayers] = useState<GameTopPlayers>(initialAdminDashboardState.gameTopPlayers);
  const [localNews, setLocalNews] = useState<NewsItem[]>(initialAdminDashboardState.localNews);
  const [globalNews, setGlobalNews] = useState<NewsItem[]>(initialAdminDashboardState.globalNews);
  const [activeTab, setActiveTab] = useState(initialAdminDashboardState.activeTab);
  
  // Handle saving changes
  const handleSaveChanges = () => {
    saveAdminDashboardChanges({
      universities,
      leagueUniversities,
      gameTopPlayers,
      localNews,
      globalNews,
      activeTab
    });
  };
  
  return (
    <AdminDashboardContext.Provider
      value={{
        universities,
        leagueUniversities,
        gameTopPlayers,
        localNews,
        globalNews,
        activeTab,
        setUniversities,
        setLeagueUniversities,
        setGameTopPlayers,
        setLocalNews,
        setGlobalNews,
        setActiveTab,
        handleSaveChanges,
      }}
    >
      {children}
    </AdminDashboardContext.Provider>
  );
};

// Custom hook to use the admin dashboard context
export const useAdminDashboard = () => {
  const context = useContext(AdminDashboardContext);
  if (context === undefined) {
    throw new Error("useAdminDashboard must be used within an AdminDashboardProvider");
  }
  return context;
};
