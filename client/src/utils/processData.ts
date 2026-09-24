import { sort } from "d3";
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

export type SortKey = "WinPercentage" | "PointsPercentage";

export function getSortedWinRateData(tsdArr: TeamSeasonData[], sortKey?: SortKey): TeamWinRateDataPoint[] {
  let sortParameter: SortKey = sortKey ? sortKey : "WinPercentage" // Defaults to sorting by Win pct.
  return tsdArr
    .map(calculateWinRates)
    .sort((a, b) => b[sortParameter] - a[sortParameter]);
}
