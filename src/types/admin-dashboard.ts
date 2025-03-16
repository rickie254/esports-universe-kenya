
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

export interface AdminDashboardState {
  universities: University[];
  leagueUniversities: LeagueUniversity[];
  gameTopPlayers: GameTopPlayers;
  localNews: NewsItem[];
  globalNews: NewsItem[];
  activeTab: string;
}
