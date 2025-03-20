
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { 
  University, 
  LeagueUniversity, 
  Player, 
  GameTopPlayers, 
  NewsItem, 
  AdminDashboardState 
} from "@/types/admin-dashboard";
import { initialAdminDashboardState } from "@/data/admin-dashboard-data";
import { saveAdminDashboardChanges, loadAdminDashboardChanges } from "@/utils/admin-dashboard-utils";

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
  setAdminName: React.Dispatch<React.SetStateAction<string>>;
  
  // Actions
  handleSaveChanges: () => void;
}

const AdminDashboardContext = createContext<AdminDashboardContextType | undefined>(undefined);

export const AdminDashboardProvider = ({ children }: { children: ReactNode }) => {
  // Try to load data from localStorage
  const savedState = loadAdminDashboardChanges();
  
  // Extract individual state slices from initial state, falling back to initial values
  const [universities, setUniversities] = useState<University[]>(
    savedState.universities || initialAdminDashboardState.universities
  );
  const [leagueUniversities, setLeagueUniversities] = useState<LeagueUniversity[]>(
    savedState.leagueUniversities || initialAdminDashboardState.leagueUniversities
  );
  const [gameTopPlayers, setGameTopPlayers] = useState<GameTopPlayers>(
    savedState.gameTopPlayers || initialAdminDashboardState.gameTopPlayers
  );
  const [localNews, setLocalNews] = useState<NewsItem[]>(
    savedState.localNews || initialAdminDashboardState.localNews
  );
  const [globalNews, setGlobalNews] = useState<NewsItem[]>(
    savedState.globalNews || initialAdminDashboardState.globalNews
  );
  const [activeTab, setActiveTab] = useState(
    savedState.activeTab || initialAdminDashboardState.activeTab
  );
  const [adminName, setAdminName] = useState(
    savedState.adminName || localStorage.getItem('adminName') || 'Admin'
  );
  
  // Handle saving changes
  const handleSaveChanges = () => {
    saveAdminDashboardChanges({
      universities,
      leagueUniversities,
      gameTopPlayers,
      localNews,
      globalNews,
      activeTab,
      adminName
    });
  };
  
  // Auto-save on component unmount and on state changes
  useEffect(() => {
    handleSaveChanges();
  }, [universities, leagueUniversities, gameTopPlayers, localNews, globalNews, activeTab, adminName]);
  
  return (
    <AdminDashboardContext.Provider
      value={{
        universities,
        leagueUniversities,
        gameTopPlayers,
        localNews,
        globalNews,
        activeTab,
        adminName,
        setUniversities,
        setLeagueUniversities,
        setGameTopPlayers,
        setLocalNews,
        setGlobalNews,
        setActiveTab,
        setAdminName,
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
