
export const getMetricLabel = (game: string): string => {
  switch (game) {
    case "tekken":
      return "Wins";
    case "fifa":
    case "efootball":
      return "Goals";
    case "pubg":
    case "codm":
      return "Kills";
    default:
      return "Points";
  }
};

export const getDefaultRating = (game: string): number => {
  switch (game) {
    case "tekken":
      return 0; // Wins
    case "fifa":
    case "efootball":
      return 0; // Goals
    case "pubg":
    case "codm":
      return 0; // Kills
    default:
      return 0;
  }
};
