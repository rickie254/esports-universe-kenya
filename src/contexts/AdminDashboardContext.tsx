
import { createContext, useContext, ReactNode, useState } from "react";

// Define types for our state
export interface University {
  name: string;
  rank: number;
  change: string;
  points: number;
}

export interface LeagueUniversity {
  name: string;
  logo?: string;
  fifa: number;
  pubg: number;
  callOfDuty: number;
  tekken: number;
  eFootball: number;
  totalPoints: number;
}

export interface Player {
  name: string;
  university: string;
  rating: number;
}

export interface GameTopPlayers {
  tekken: Player[];
  fifa: Player[];
  efootball: Player[];
  pubg: Player[];
  codm: Player[];
  [key: string]: Player[];
}

export interface NewsItem {
  title: string;
  date: string;
  type: string;
}

interface AdminDashboardContextType {
  // State
  universities: University[];
  leagueUniversities: LeagueUniversity[];
  gameTopPlayers: GameTopPlayers;
  localNews: NewsItem[];
  globalNews: NewsItem[];
  activeTab: string;
  
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
  // University rankings state
  const [universities, setUniversities] = useState<University[]>([
    { name: "University of Nairobi", rank: 1, change: "up", points: 2500 },
    { name: "Strathmore University", rank: 2, change: "down", points: 2400 },
    { name: "Kenyatta University", rank: 3, change: "up", points: 2300 },
    { name: "JKUAT", rank: 4, change: "same", points: 2200 },
  ]);
  
  // League table state
  const [leagueUniversities, setLeagueUniversities] = useState<LeagueUniversity[]>([
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
  
  // Players state
  const [gameTopPlayers, setGameTopPlayers] = useState<GameTopPlayers>({
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
  
  // News state
  const [localNews, setLocalNews] = useState<NewsItem[]>([
    { title: "UoN Dominates Regional Tournament", date: "2024-03-10", type: "local" },
    { title: "New Esports Arena Opens at Strathmore", date: "2024-03-08", type: "local" },
    { title: "KU Team Qualifies for Continental Championship", date: "2024-03-05", type: "local" },
  ]);
  
  const [globalNews, setGlobalNews] = useState<NewsItem[]>([
    { title: "Major Updates Coming to PUBG Mobile", date: "2024-03-10", type: "global" },
    { title: "FIFA 24 Global Series Announced", date: "2024-03-09", type: "global" },
    { title: "New Tekken Tournament Circuit Revealed", date: "2024-03-07", type: "global" },
  ]);
  
  // Active tab state
  const [activeTab, setActiveTab] = useState("universities");
  
  // Handle saving changes
  const handleSaveChanges = () => {
    localStorage.setItem("universities", JSON.stringify(universities));
    localStorage.setItem("gameTopPlayers", JSON.stringify(gameTopPlayers));
    localStorage.setItem("localNews", JSON.stringify(localNews));
    localStorage.setItem("globalNews", JSON.stringify(globalNews));
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
