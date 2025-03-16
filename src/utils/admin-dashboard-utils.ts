
import { AdminDashboardState } from "@/types/admin-dashboard";

// Handle saving changes to localStorage
export const saveAdminDashboardChanges = (state: AdminDashboardState): void => {
  localStorage.setItem("universities", JSON.stringify(state.universities));
  localStorage.setItem("gameTopPlayers", JSON.stringify(state.gameTopPlayers));
  localStorage.setItem("localNews", JSON.stringify(state.localNews));
  localStorage.setItem("globalNews", JSON.stringify(state.globalNews));
};
