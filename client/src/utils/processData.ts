import type { TeamSeasonData, TeamWinRateDataPoint } from "../types";

export function calculateWinRates(tsd: TeamSeasonData): TeamWinRateDataPoint {
  if (tsd.MatchesPlayed === 0) {
    return {
      ClubName: tsd.ClubName,
      WinPercentage: 0,
      PointsPercentage: 0,
    }
  }
  return {
    ClubName: tsd.ClubName,
    WinPercentage: Math.round(((tsd.Wins / tsd.MatchesPlayed) * 100)*10)/10,
    PointsPercentage: Math.round(((tsd.Points / (tsd.MatchesPlayed * 3)) * 100)*10)/10
  }
}

export function getSortedWinRateData(tsdArr: TeamSeasonData[]): TeamWinRateDataPoint[] {
  return tsdArr
    .map(calculateWinRates)
    .sort((a, b) => b.WinPercentage - a.WinPercentage); // by default sort by win pct. could also use a[SortKey] and b[SortKey] TODO:
}
