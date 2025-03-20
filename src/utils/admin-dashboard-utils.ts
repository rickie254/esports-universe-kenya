
import { AdminDashboardState } from "@/types/admin-dashboard";

// Handle saving changes to localStorage
export const saveAdminDashboardChanges = (state: AdminDashboardState): void => {
  try {
    localStorage.setItem("universities", JSON.stringify(state.universities));
    localStorage.setItem("leagueUniversities", JSON.stringify(state.leagueUniversities));
    localStorage.setItem("gameTopPlayers", JSON.stringify(state.gameTopPlayers));
    localStorage.setItem("localNews", JSON.stringify(state.localNews));
    localStorage.setItem("globalNews", JSON.stringify(state.globalNews));
    localStorage.setItem("activeTab", state.activeTab);
    localStorage.setItem("adminName", state.adminName || "Admin");
    console.log("Admin dashboard changes saved successfully");
  } catch (error) {
    console.error("Error saving admin dashboard changes:", error);
  }
};

// Load data from localStorage
export const loadAdminDashboardChanges = (): Partial<AdminDashboardState> => {
  try {
    const universities = localStorage.getItem("universities");
    const leagueUniversities = localStorage.getItem("leagueUniversities");
    const gameTopPlayers = localStorage.getItem("gameTopPlayers");
    const localNews = localStorage.getItem("localNews");
    const globalNews = localStorage.getItem("globalNews");
    const activeTab = localStorage.getItem("activeTab");
    const adminName = localStorage.getItem("adminName");
    
    return {
      universities: universities ? JSON.parse(universities) : undefined,
      leagueUniversities: leagueUniversities ? JSON.parse(leagueUniversities) : undefined,
      gameTopPlayers: gameTopPlayers ? JSON.parse(gameTopPlayers) : undefined,
      localNews: localNews ? JSON.parse(localNews) : undefined,
      globalNews: globalNews ? JSON.parse(globalNews) : undefined,
      activeTab: activeTab || undefined,
      adminName: adminName || undefined,
    };
  } catch (error) {
    console.error("Error loading admin dashboard changes:", error);
    return {};
  }
};
