
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
  // Try to load data from localStorage first, fallback to initial state
  const loadFromLocalStorage = () => {
    try {
      const storedUniversities = localStorage.getItem("universities");
      const storedGameTopPlayers = localStorage.getItem("gameTopPlayers");
      const storedLocalNews = localStorage.getItem("localNews");
      const storedGlobalNews = localStorage.getItem("globalNews");
      const storedActiveTab = localStorage.getItem("activeTab");
      
      return {
        universities: storedUniversities ? JSON.parse(storedUniversities) : initialAdminDashboardState.universities,
        leagueUniversities: initialAdminDashboardState.leagueUniversities,
        gameTopPlayers: storedGameTopPlayers ? JSON.parse(storedGameTopPlayers) : initialAdminDashboardState.gameTopPlayers,
        localNews: storedLocalNews ? JSON.parse(storedLocalNews) : initialAdminDashboardState.localNews,
        globalNews: storedGlobalNews ? JSON.parse(storedGlobalNews) : initialAdminDashboardState.globalNews,
        activeTab: storedActiveTab || initialAdminDashboardState.activeTab,
      };
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return initialAdminDashboardState;
    }
  };
  
  const savedState = loadFromLocalStorage();
  
  // Extract individual state slices from initial state
  const [universities, setUniversities] = useState<University[]>(savedState.universities);
  const [leagueUniversities, setLeagueUniversities] = useState<LeagueUniversity[]>(savedState.leagueUniversities);
  const [gameTopPlayers, setGameTopPlayers] = useState<GameTopPlayers>(savedState.gameTopPlayers);
  const [localNews, setLocalNews] = useState<NewsItem[]>(savedState.localNews);
  const [globalNews, setGlobalNews] = useState<NewsItem[]>(savedState.globalNews);
  const [activeTab, setActiveTab] = useState(savedState.activeTab);
  
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
  
  // Auto-save on component unmount
  useEffect(() => {
    return () => {
      handleSaveChanges();
    };
  }, [universities, leagueUniversities, gameTopPlayers, localNews, globalNews, activeTab]);
  
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
